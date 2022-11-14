export default ToggleSwitch;
declare function ToggleSwitch({ id, name, checked, onChange, optionLabels, small, disabled, toggleSwitchExtraClass, toggleTextExtraClass, }: {
    id: any;
    name: any;
    checked: any;
    onChange: any;
    optionLabels: any;
    small: any;
    disabled: any;
    toggleSwitchExtraClass: any;
    toggleTextExtraClass: any;
}): JSX.Element;
declare namespace ToggleSwitch {
    namespace defaultProps {
        const optionLabels: string[];
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        export const checked: PropTypes.Validator<boolean>;
        export const onChange: PropTypes.Validator<(...args: any[]) => any>;
        export const name: PropTypes.Requireable<string>;
        const optionLabels_1: PropTypes.Requireable<any[]>;
        export { optionLabels_1 as optionLabels };
        export const small: PropTypes.Requireable<boolean>;
        export const disabled: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from "prop-types";
