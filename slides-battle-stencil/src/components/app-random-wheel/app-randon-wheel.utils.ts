type Coordinate = {
    x: number;
    y: number;
}

const generatePiePointsCoordinate = (radius: number) => (n: number) => {
    let points: ReadonlyArray<Coordinate> = [];
    for (let i = 0; i < n; i++) {
        points = [...points, {
            x: radius * Math.cos(i * ((2 * Math.PI) / n)),
            y: radius * Math.sin(i * ((2 * Math.PI) / n))
        }]
    }
    return points;
}

const generatePieSectionPathDefinition = (radius: number) => (startCoordinate: Coordinate,
    endCoordinate: Coordinate) => `M ${startCoordinate.x} ${startCoordinate.y} A ${radius} ${radius}, 0, 0, 1, ${endCoordinate.x} ${endCoordinate.y} L 0 0 Z`;

const generateTextDefPathDefinition = (startCoordinate: Coordinate,
    endCoordinate: Coordinate) => `M ${startCoordinate.x} ${startCoordinate.y} L ${endCoordinate.x} ${endCoordinate.y}`

export const generatePieSectionPathAttributes = (fillColors: ReadonlyArray<string>) => (radius: number) => (n: number) => {
    if (fillColors && fillColors.length < n) {
        throw Error('Notenough colors to fill pie section');
    }

    return generatePiePointsCoordinate(radius)(n).map((value, index, array) => {
        if (index !== array.length - 1) {
            return {
                fill: fillColors[index],
                d: generatePieSectionPathDefinition(radius)(value, array[index + 1]),
                stroke: 'black',
                'stroke-width': '0.2'
            };
        } else {
            return {
                fill: fillColors[index],
                d: generatePieSectionPathDefinition(radius)(value, array[0]),
                stroke: 'black',
                'stroke-width': '0.2'
            };
        }
    });
};

export const generateTextIds = (n) => Array.from({ length: n }, (_, index) => `path-text-${index}`);

export const generateTextDefPathAttributes = (radius: number) => (n: number) => {
    return generateTextIds(n).map((value, index, array) => {
        const angle = ((2 * index + 1) * Math.PI) / array.length;
        const startCoordinate: Coordinate = {
            x: radius * 0.25 * Math.cos(angle),
            y: radius * 0.25 * Math.sin(angle)
        };
        const endCoordinate: Coordinate = {
            x: radius * 0.75 * Math.cos(angle),
            y: radius * 0.75 * Math.sin(angle)
        };
        return {
            id: value,
            d: generateTextDefPathDefinition(startCoordinate, endCoordinate)
        }
    })
}
