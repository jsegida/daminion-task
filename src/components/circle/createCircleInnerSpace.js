import { FOLLOW } from "../../constants";

const _calculateHypotenuseLength = (first, second) => Math.sqrt(first ** 2 + second ** 2);

const _calculateLineLength = (first, second) => _calculateHypotenuseLength(first.x - second.x, first.y - second.y);

const _splitLine = ({ first, second }, ratio) => ({
    x: (first.x + ratio * second.x) / (1 + ratio),
    y: (first.y + ratio * second.y) / (1 + ratio)
});

const _extendLine = ({ first, second }, ratio) => ({
    x: first.x * (1 + ratio) - ratio * second.x,
    y: first.y * (1 + ratio) - ratio * second.y
});

const _calculateRelativeCoordinates = (position, offset) => ({
    x: position.x - offset.x,
    y: position.y - offset.y
});

const _follow = ({ center, offset }, mousePosition, radius) => {
    let position;
    const absoluteCenter = {
        x: center + offset.x,
        y: center + offset.y
    };
    const maxDistance = center - radius;
    const distance = _calculateLineLength(mousePosition, absoluteCenter);

    if (distance > maxDistance) {
        position = _splitLine({
            first: absoluteCenter,
            second: mousePosition
        }, maxDistance / (distance - maxDistance));
    } else {
        position = mousePosition;
    }

    return _calculateRelativeCoordinates(position, offset);
};

const _calculateCirclesIntersection = (first, second) => {
    const xLength = second.x - first.x;
    const yLength = second.y - first.y;
    const centersDistance = _calculateHypotenuseLength(xLength, yLength);
    const intersectionDistance = (centersDistance ** 2 + first.radius ** 2 - second.radius ** 2) /
        (2 * centersDistance);
    const height = Math.sqrt(first.radius ** 2 - intersectionDistance ** 2);
    const a = first.x + xLength * intersectionDistance / centersDistance;
    const b = yLength / centersDistance * height;
    const c = first.y + yLength * intersectionDistance / centersDistance;
    const d = xLength / centersDistance * height;

    return {
        first: {
            x: a + b,
            y: c - d
        },
        second: {
            x: a - b,
            y: c + d
        }
    }
};

const _escape = ({ center, offset }, { center: circleCenter, radius }, mousePosition) => {
    const requiredDistance = radius + center / 10;
    const absoluteCircleCenter = {
        x: circleCenter.x + offset.x,
        y: circleCenter.y + offset.y
    };

    const circleCenterMouseDistance = _calculateLineLength(absoluteCircleCenter, mousePosition);
    if (circleCenterMouseDistance > requiredDistance) {
        return circleCenter;
    }

    let position = _extendLine({
        first: absoluteCircleCenter,
        second: mousePosition
    }, (requiredDistance - circleCenterMouseDistance) / circleCenterMouseDistance);

    const absoluteCenter = {
        x: center + offset.x,
        y: center + offset.y
    };
    if (_calculateLineLength(position, absoluteCenter) + radius > center) {
        const { first, second } = _calculateCirclesIntersection({
            ...mousePosition,
            radius: requiredDistance
        }, {
            ...absoluteCenter,
            radius: center - radius
        });
        position = _calculateLineLength(first, position) > _calculateLineLength(second, position) ? second : first;
    }

    return _calculateRelativeCoordinates(position, offset);
};

const END_ANGLE = 6.283185307179586;

export default ({ circle: { radius, color }, behavior, mousePosition }, existingElement) => {
    const _resize = () => {
        const width = existingElement.offsetWidth;
        if (size !== width) {
            size = width;
            existingElement.width = size;
            existingElement.height = size;

            previous = {};
            currentMousePosition = {};

            requestAnimationFrame(_draw);
        }
    };

    const _calculateCirclePosition = () => {
        const center = size / 2;
        if (!currentBehavior || currentMousePosition.x === undefined || previous.x === undefined) {
            return {
                x: center,
                y: center
            }
        }

        const { left, top } = existingElement.getBoundingClientRect();
        const offset = {
            x: left + pageXOffset,
            y: top + pageYOffset
        };

        return currentBehavior === FOLLOW ? _follow({
            center,
            offset
        }, currentMousePosition, radius) : _escape({
            center,
            offset
        }, {
            center: previous,
            radius
        }, currentMousePosition);
    };

    const _drawCircle = (x, y) => {
        context.beginPath();
        context.arc(x, y, radius, 0, END_ANGLE);
        context.fillStyle = color;
        context.fill();
    };

    const _draw = () => {
        const { x, y } = _calculateCirclePosition();
        if (previous.x !== x || previous.y !== y) {
            if (previous.x !== undefined) {
                context.clearRect(0, 0, size, size);
            }

            previous = {
                x,
                y
            };
            _drawCircle(x, y);
        }
    };

    let size;
    let previous = {};
    let currentMousePosition = mousePosition;
    let currentBehavior = behavior;

    const context = existingElement.getContext("2d");

    return {
        element: existingElement,
        initialize: () => {
            _resize();
            addEventListener("resize", _resize);
        },
        update: ({ behavior, mousePosition }) => {
            currentBehavior = behavior;
            currentMousePosition = mousePosition;
            requestAnimationFrame(_draw);
        },
        destroy: () => removeEventListener("resize", _resize)
    }
};
