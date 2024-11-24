import CalculatorView from "../view/CalculatorView.mjs";

const view = new CalculatorView();
export default class CalculatorService {
    constructor(emitter, operations) {
        operations.forEach((fun, funName) => {
            emitter.addListener(funName, (operands, response) => {
                const res = fun(operands[0], operands[1]);
                response.end(view.getHtml(res, false))
            }
            )
        })
    }
}