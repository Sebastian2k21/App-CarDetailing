import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";


//fields structure
// [
//     {"name": "first_name", "label": "First name", "type": "text"},
//     {"name": "last_name", "label": "Last name", "type": "text"},
//     {"name": "email", "label": "Email", "type": "email"},
//     {"name": "phone", "label": "Phone", "type": "tel"},
//     {"name": "street", "label": "Street", "type": "text"},
//     {"name": "city", "label": "City", "type": "text"},
//     {"name": "zip_code", "label": "Zip code", "type": "text"},
// ]


const CommonForm = ({fields, data, onSubmit, title="", validator=null, otherComponents=[]}) => {
    const [formData, setFormData] = useState(null);
    
    const convertToBase64 = (fieldName, file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData({
                ...formData,
                [fieldName + "_file"]: reader.result,
            });
        };
        reader.onerror = (error) => {
          console.log("Error: ", error);
        };
      };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            convertToBase64(name, e.target.files[0]);
            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validator && !validator(formData)) {
            toast.error("Invalid data")
            return;
        }

        console.log('Form submitted', formData);
        await onSubmit(formData)
    };

    useEffect(() => {
        setFormData(data)
    }, [data])


    return (
        <LoadingSpinner statement={formData}>
            <div key="common_form">
                <h3 key={"form_title"}>{title}</h3>


            <form onSubmit={handleSubmit}>
                {formData && fields.map(field =>  <div key={field.name}>
                    <label>
                        {field.label}:
                        <input type={field.type} name={field.name} value={formData[field.name]}
                            onChange={handleChange} required={field.required} />
                    </label>
                </div> )}
                {formData && otherComponents.map(Comp => <div>
                    {<Comp onChange={handleChange}/>}
                </div>)}
                <button type="submit">Change data</button>
            </form>
            </div>      
        </LoadingSpinner>
    );
}

export default CommonForm;