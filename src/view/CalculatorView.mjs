import view_config from "../config/view.json" with {type: 'json'};
export default class CalculatorView {
    getHtml(res, isError){
        return `<label style="font-size:${view_config.font_size}; display:block; text-align:${view_config.text_aligning}; color:${isError ? view_config.error_color:view_config.result_color}">${res}</label>`
    }
}