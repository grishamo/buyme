import interact from 'interactjs';
import Storage from './Storage';


function dragMoveListener (event) {
    let target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function SetElementPosition(elem) {
    const dataX = Storage.get("data-x") || 0;
    const dataY = Storage.get("data-y") || 0;
    const width = Storage.get("width") || "600px";
    const height = Storage.get("height") || "400px";

    elem.setAttribute('data-x', dataX);
    elem.setAttribute('data-y', dataY);
    elem.style.width = width;
    elem.style.height = height;
    elem.style.transform =
        'translate(' + dataX + 'px, ' + dataY + 'px)';
}

function DragAndResize(elem, fnCb) {

    interact(elem)
        .draggable({
            onmove: dragMoveListener,
            restrict: {
                restriction: 'parent',
                elementRect: {top: 0, left: 0, bottom: 1, right: 1}
            },
            onend: () => {
                const dataX = elem.getAttribute('data-x');
                const dataY = elem.getAttribute('data-y');

                Storage.set('data-x' ,dataX);
                Storage.set('data-y' ,dataY);
            }
        })
        .resizable({
            // resize from all edges and corners
            edges: {left: true, right: true, bottom: true, top: true},

            // keep the edges inside the parent
            restrictEdges: {
                outer: 'parent',
                endOnly: true,
            },

            // minimum size
            restrictSize: {
                min: {width: 300, height: 50},
            },

            inertia: true,
        })
        .on('resizeend', (event) => {
            const width = elem.style.width;
            const height = elem.style.height;

            Storage.set('width', width);
            Storage.set('height', height);
        })
        .on('resizemove', (event) => {
            let target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            if (fnCb) {
                fnCb(event.rect.height);
            }
        });
}

export {DragAndResize, SetElementPosition};