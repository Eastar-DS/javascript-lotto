import Component from "../../../core/component.js";
import { styleStr } from "../../../helper/style.js";

class Table extends Component {
  constructor() {
    super();
  }

  setDefaultProps() {
    this.props = {
      headers: [],
      data: [],
      styles: {},
    };
  }

  template() {
    return (props) => {
      if (props) this.setProps(props);

      const { headers, data, styles } = this.props;

      const headerHtml = headers
        .map(
          (header) => `<th class="cell p-8 text-center border-b">${header}</th>`
        )
        .join("");

      const rowsHtml = data
        .map(
          (rowData) =>
            `<tr>${rowData
              .map(
                (cellData) =>
                  `<td class="cell p-8 text-center border-b">${cellData}</td>`
              )
              .join("")}
            </tr>`
        )
        .join("");

      return `
        <table 
          class="w-full" 
          style="${styleStr(
            styles
          )} table-layout: auto; border-collapse: collapse;">
          <thead>
            <tr>${headerHtml}</tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      `;
    };
  }

  render(props) {
    if (props) this.setProps(props);
    const templateFn = this.template();
    return templateFn(this.props);
  }
}

export default Table;
