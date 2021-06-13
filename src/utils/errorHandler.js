import { notify } from './toastr'
export const handleError = (error) => {
    debugger;
    let err = error.response;
    let errMsg = 'Something Went Wrong';
    if (err) {
        errMsg = err && err.data && err.data.msg;
    }
    notify.showError(errMsg)

    // TODO parse database error 

    // accept error
    // check error
    // parse error
    // prepare error
    // show them in UI
}
