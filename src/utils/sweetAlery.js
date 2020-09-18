import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const showAlert = ([message1, message2, message3], isSuccess) => {
    const Alert = withReactContent(Swal);
    return Alert.fire({
        type: isSuccess ? 'success' : 'warning',
        title: message1,
        text: message2,
        showConfirmButton: true,
        confirmButtonText: message3,
        allowOutsideClick: true
    });
}

export default showAlert;
