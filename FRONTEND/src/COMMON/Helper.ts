
// VALIDATE THE FORMS
export const validateForm = (form: any) => {
    try {


        let isValid = true;

        Array.from(form.elements).forEach((element: any) => {

            if (element.required && !element.value) {

                isValid = false;

                element.classList.add("border-red-600");

                if (element.type === "file") {
                    const ele = document.getElementsByName(`${element.id}`)
                    ele[0].classList.add("border-red-600");

                }

            } else {
                element.classList.remove("border-red-600");
                if (element.type === "file") {
                    const ele = document.getElementsByName(`${element.id}`)
                    ele[0].classList.remove("border-red-600");
                }
            }
        });
        return isValid;
    } catch (err) {
        console.error(err);
    }
}



// ------------  FOR NUMBER INPUT FILED SCROLL TO CHANGE PREVENT -------

export const handleWheel = (e:any) => {
    e.target.blur();
};
