// validate the forms
export const validateForm = (form: any) => {
  // is valid or not value
  let isValid = true;

  // loop the each form element
  Array.from(form.elements).forEach((element: any) => {
    //  validate the required inputs are not empty
    if (element.required && !element.value) {
      // false the isvalid key
      isValid = false;

      // add the invalid css class
      element.classList.add("border-red-600");

      //  validate the file inputs
      if (element.type === "file") {
        const ele = document.getElementsByName(`${element.id}`);
        ele[0].classList.add("border-red-600");
      }
    } else {
      //  remove the invalid css
      element.classList.remove("border-red-600");
      if (element.type === "file") {
        const ele = document.getElementsByName(`${element.id}`);
        ele[0].classList.remove("border-red-600");
      }
    }
  });
  return isValid;
};

// ------------  for number input filed scroll to change prevent -------

export const handleWheel = (e: any) => {
  e.target.blur();
};
