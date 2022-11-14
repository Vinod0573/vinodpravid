export default TableByJp;
declare function TableByJp({ cols, data, idOutside, bordered, hoverable, striped, isDark, pageNo, isLoading, extraTableClass, extraTableTheadClass, theadTrExtraStyle, trThExtraStyle, tbodytrExtraStyle, tbodytrtdExtraStyle, extraStyleTableDiv, noDataUploaded, hideBorderArray }: {
    cols: any;
    data: any;
    idOutside: any;
    bordered: any;
    hoverable: any;
    striped: any;
    isDark: any;
    pageNo: any;
    isLoading: any;
    extraTableClass: any;
    extraTableTheadClass: any;
    theadTrExtraStyle: any;
    trThExtraStyle: any;
    tbodytrExtraStyle: any;
    tbodytrtdExtraStyle: any;
    extraStyleTableDiv: any;
    noDataUploaded: any;
    hideBorderArray: any;
}, props: any): JSX.Element;
declare namespace TableByJp {
    namespace propTypes {
        const cols: PropTypes.Validator<any[]>;
        const data: PropTypes.Validator<any[]>;
        const bordered: PropTypes.Requireable<boolean>;
        const hoverable: PropTypes.Requireable<boolean>;
        const striped: PropTypes.Requireable<boolean>;
        const isDark: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const bordered_1: boolean;
        export { bordered_1 as bordered };
        const hoverable_1: boolean;
        export { hoverable_1 as hoverable };
        const striped_1: boolean;
        export { striped_1 as striped };
        const isDark_1: boolean;
        export { isDark_1 as isDark };
    }
}
import PropTypes from "prop-types";
