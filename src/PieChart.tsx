export type Segment = {
    color: string;
    angle: number;
};

function radians(degrees: number): number {
    return degrees * Math.PI / 180;
}

function ChartSegment({x, y, radius, startAngle, endAngle, color}: {x: number, y: number, radius: number, startAngle: number, endAngle: number, color: string}) {
    const startX = x + radius * Math.cos(radians(startAngle));
    const startY = y + radius * Math.sin(radians(startAngle));
    const endX = x + radius * Math.cos(radians(endAngle));
    const endY = y + radius * Math.sin(radians(endAngle));

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return <path d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} L ${x} ${y} Z`} fill={color} />;
}

export function PieChart({ segments }: {segments: Segment[]}) {
    let startAngle = 0;
    return <svg width="100" height="100" viewBox="-1 -1 2 2" style={{transform: "rotate(-90deg)"}}>
        {
        segments.map((segment, idx) => {
            const endAngle = startAngle + segment.angle;
            const rendered = <ChartSegment key={idx} x={0} y={0} radius={1} startAngle={startAngle} endAngle={endAngle} color={segment.color} />;
            startAngle = endAngle;
            return rendered;
        })
        }
        </svg>;
}

// const segments: Segment[] = [
//     { color: 'green', angle: 120 },
//     { color: 'grey', angle: 120 },
//     { color: 'red', angle: 120 }
// ];

// const svgPieChart = generatePieChart(segments);
// console.log(svgPieChart);
