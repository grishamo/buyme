import '../styles/index.scss';
import {Charts} from './modules/Charts';
import DomElements from './modules/DomElements';
import {DragAndResize, SetElementPosition} from './modules/DomElementsBehavior';
import Fixer from './modules/Fixer';

let fixerOptions = {
    base: "EUR",
    symbols: "ILS,USD,GBP"
};


SetElementPosition(DomElements.resizeDragClass);


Fixer.GetWeeklyRates(fixerOptions)
    .then((rates) => {
        console.dir(rates);

        Charts.Draw(DomElements.chartElem, rates, {height: DomElements.resizeDragClass.offsetHeight});

        DragAndResize(DomElements.resizeDragClass, (height) => {
            // Update Chart View
            Charts.Draw(DomElements.chartElem, rates, {height: height});
        });

    })
    .catch((err) => console.dir(err));


