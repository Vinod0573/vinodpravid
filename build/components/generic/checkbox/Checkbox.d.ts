export default Checkbox;
declare function Checkbox(props: any): JSX.Element;
declare namespace Checkbox {
    namespace propTypes {
        const extraClass: propTypes.Requireable<string>;
        const disabled: propTypes.Requireable<boolean>;
        const checked: number;
        const defaultChecked: propTypes.Requireable<boolean>;
        const tabIndex: propTypes.Requireable<number>;
        const extraSpan: propTypes.Requireable<string>;
        const text: propTypes.Requireable<string>;
        const labelClass: propTypes.Requireable<string>;
        const style: propTypes.Requireable<object>;
        const multiple: propTypes.Requireable<boolean>;
    }
}
import propTypes_1 from "prop-types";
