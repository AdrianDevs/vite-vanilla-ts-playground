type Answer = {
  [key: number]: number;
};

export const reduceQuestion = (input: number[]): Answer => {
  const ans: Answer = {};
  ans[input[0]] = 1;

  input.reduce((acc, curr) => {
    if (ans[curr]) {
      ans[curr] += 1;
    } else {
      ans[curr] = 1;
    }
    acc += curr;
    return acc;
  });

  return ans;
};

type Vertex = { x: number; y: number; visited: boolean; value: number };

const locationValue = (x: number, y: number, input: number[][]): number => {
  return input[x][y];
};

const validNeighbourCoordinates = (
  x: number,
  y: number,
  input: number[][],
): boolean => {
  return x >= 0 && x < input.length && y >= 0 && y < input[0].length;
};

enum Direction {
  Above,
  Below,
  Left,
  Right,
}

const neighbourCoordinates = (x: number, y: number, dir: Direction) => {
  switch (dir) {
    case Direction.Above:
      return { x: x - 1, y };
    case Direction.Below:
      return { x: x + 1, y };
    case Direction.Left:
      return { x, y: y - 1 };
    case Direction.Right:
      return { x, y: y + 1 };
    default:
      throw new Error('Invalid direction');
  }
};

const getVertex = (x: number, y: number, vertices: Vertex[]): Vertex | null => {
  return vertices.find((v) => v.x === x && v.y === y) || null;
};

type Location = {
  x: number;
  y: number;
};

const getAllNeighbourCoordinates = (
  x: number,
  y: number,
  input: number[][],
): Location[] => {
  const neighbours: Location[] = [];

  // eslint-disable-next-line consistent-return
  Object.keys(Direction).forEach((value) => {
    if (Number.isNaN(Number(value))) {
      // Skip non-numeric keys like 'constructor'
      return false;
    }

    const dir = parseInt(value.toString(), 10) as Direction;
    const position = neighbourCoordinates(x, y, dir);
    if (
      validNeighbourCoordinates(position.x, position.y, input) &&
      locationValue(position.x, position.y, input) === 1
    ) {
      neighbours.push(position);
    }
  });

  return neighbours;
};

const getFirstKnownNeighbourIsland = (
  x: number,
  y: number,
  input: number[][],
  vertices: Vertex[],
): Vertex | null => {
  const allNeighbourCoordinates = getAllNeighbourCoordinates(x, y, input);
  if (allNeighbourCoordinates.length === 0) {
    return null;
  }
  const neighbourCoordiantes = allNeighbourCoordinates.find((position) => {
    const v = getVertex(position.x, position.y, vertices);
    return v?.visited;
  });

  if (!neighbourCoordiantes) {
    return null;
  }

  const vertex = getVertex(
    neighbourCoordiantes.x,
    neighbourCoordiantes.y,
    vertices,
  );

  return vertex;
};

export const algoQuestion = (input: number[][]): number => {
  const vertices: Vertex[] = [];

  input.forEach((row, x) => {
    row.forEach((value, y) => {
      vertices.push({ x, y, visited: false, value });
    });
  });

  let islandCount = 0;

  input.forEach((row, x) => {
    row.forEach((value, y) => {
      const vertex = vertices.find((v) => v.x === x && v.y === y);
      if (!vertex || vertex.visited) {
        return;
      }

      // Check if the vertex is part of an island
      if (value === 1) {
        const neighbour = getFirstKnownNeighbourIsland(x, y, input, vertices);
        if (neighbour) {
          vertex.value = neighbour.value;
        } else {
          islandCount += 1;
          vertex.value = islandCount;
        }
      }
      vertex.visited = true;
    });
  });

  return islandCount;
};

const checkLocation = (
  x: number,
  y: number,
  input: number[][],
  vertices: Vertex[][],
) => {
  const vertex = vertices[x][y];
  if (vertex.visited) {
    return;
  }

  if (vertex.value === 0) {
    vertex.visited = true;
    return;
  }

  // has neighbour to the right
  if (x + 1 < input.length && input[x + 1][y] === 1) {
    checkLocation(x + 1, y, input, vertices);
  }
  // has neighbour below
  if (y + 1 < input[x].length && input[x][y + 1] === 1) {
    checkLocation(x, y + 1, input, vertices);
  }

  vertex.visited = true;
};

const initialiseVertices = (input: number[][]): Vertex[][] => {
  const vertices: Vertex[][] = [];
  input.forEach((row, x) => {
    vertices.push([]);
    row.forEach((value, y) => {
      vertices[x].push({ x, y, visited: false, value });
    });
  });

  return vertices;
};

export const islandsQuestion = (input: number[][]): number => {
  const vertices = initialiseVertices(input);
  let islandCount = 0;
  vertices.forEach((row, x) => {
    row.forEach((v, y) => {
      if (v.visited) {
        return;
      }
      if (v.value === 0) {
        v.visited = true;
        return;
      }
      islandCount += 1;
      checkLocation(x, y, input, vertices);
    });
  });
  return islandCount;
};

export const sumQuestion = (input: number[], wanted: number): number[] => {
  const ans: number[] = [];
  const map = new Map<number, number>();

  for (let i = 0; i < input.length; i += 1) {
    const diff = wanted - input[i];
    if (map.has(diff)) {
      ans.push(diff, input[i]);
    } else {
      map.set(input[i], i);
    }
  }
  return ans;
};
