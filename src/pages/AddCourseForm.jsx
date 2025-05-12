import { Card, Input, Stack, Textarea, Group, Button, Steps } from "@chakra-ui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import * as React from "react";
import Alert from "@mui/material/Alert";
import Grow from "@mui/material/Grow";
import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";


import {
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
} from "../components/ui/steps";
import { Field } from "../components/ui/field";
import { addCourse, updateCourse } from "../api/courseService.js";
import { updateCourseInCart } from '../features/cartSlice.js'
import './addCourseForm.css'

import { addImage } from '../api/courseService.js'



const AddCourseForm = () => {



  const currentUser = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);



  const location = useLocation();
  const { status } = location.state || {};
  const { details } = location.state || {};

  const locationsArray = details?.course.locations;
  const categoriesArray = details?.course.categories;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isDirty },
    trigger,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      locations: locationsArray?.map(city => ({ location: city })) || [{ location: "" }],
      categories: categoriesArray?.map(cat => ({
        value: cat.toUpperCase(),
        label: cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase(),
      })) || []

    }
  });
  const firstError = errors.name?.message || errors.describe?.message || errors.motivation?.message;
  const secondError = errors.openingDate?.message || errors.price?.message || errors.long?.message;

  const { fields, append, remove } = useFieldArray({ control, name: "locations" });

  // ניהול שלבים
  const [step, setStep] = useState(0);
  // שמירת נתוני כל השלבים
  const [formData, setFormData] = useState({});
  const [nameImage, setNameImage] = useState(status === "EDIT" ? details.course.img : "");
  let dispatch = useDispatch()


  const categories = [
    { value: 'PROGRAMMING', label: 'Programming' },
    { value: 'DESIGN', label: 'Design' },
    { value: 'BUSINESS', label: 'Business' },
    { value: 'MUSIC', label: 'Music' },
    { value: 'FITNESS', label: 'Fitness' },
    { value: 'DEVELOPMENT', label: 'Development' },
    { value: 'MEDIA', label: 'Media' },
    { value: 'SPORT', label: 'Sport' },
    { value: 'GAMING', label: 'Gaming' },
    { value: 'PHOTOGRAPHY', label: 'Photography' },
    { value: 'TRAVEL', label: 'Travel' },
    { value: 'CONDTORIA', label: 'Condtoria' },
    { value: 'DIET', label: 'Diet' },
    { value: 'RIDING', label: 'Riding' },
  ];
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(details?.course?.img ? `https://res.cloudinary.com/dc583pymo/image/upload/v1745307156/uploads/${details.course.img}` : ""); // כתובת התמונה לתצוגה


  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    const storedImageName = localStorage.getItem("selectedImageName");

    if (storedImage && storedImageName) {
      setPreview(storedImage);
      setNameImage(storedImageName);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));

      // שמירת הנתונים ב- localStorage
      localStorage.setItem("selectedImage", URL.createObjectURL(file));
      localStorage.setItem("selectedImageName", file.name);
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("בחר תמונה!");


    const formDa = new FormData();
    formDa.append("image", image);
    setNameImage(image.name)
    // alert(image.name)

    try {
      const response = await addImage(formDa)
      console.log("הקובץ נשמר ב:", response.data.filePath);
      localStorage.removeItem("selectedImage");
      localStorage.removeItem("selectedImageName");

    } catch (error) {
      console.error("שגיאה בהעלאה:", error);
    }
  };






  // שומר את הנתונים של השלב הנוכחי ל- formData הכללי
  const saveStepData = () => {
    const currentStepData = getValues();
    setFormData((prev) => ({ ...prev, ...currentStepData }));
    console.log("Finallllllllllllllllllll:", currentStepData);
  };

  // מעבר לשלב הבא רק אם כל השדות תקינים
  const nextStep = async () => {
    const isValid = await trigger(); // בודק אם השדות בשלב הנוכחי תקינים
    if (isValid) {

      saveStepData();
      setStep((prev) => prev + 1);

    }

  };

  const prevStep = async () => {
    setStep((prev) => prev - 1);
  };




  // שליחת הטופס הסופי
  const onSubmit = () => {
    // שמירה אחרונה של נתוני השלב
    const currentStepData = getValues();
    let locations = currentStepData.locations.map(item => item.location)
    let categories = currentStepData.categories.map(item => item.value)
    // console.log(image.name)
    if (status === "EDIT") {

      let img;
      if (image) {
        img = image.name

        handleUpload()

      }
      else
        img = details.course.img

      let data = { ...formData, locations, categories, img }

      updateCourse(details.course, data, currentUser?.token)
        .then((res) => {
          console.log(res)

          let id = details.course._id

          console.log("lll", data)
          dispatch(updateCourseInCart({ id, data }))

          setStep((prev) => prev + 1);


        })
        .catch((err) => {
          if (err.response.status == 401)
            navigate("/login")
          console.log(err);
          alert("Error: " + err.response.data.title);
        });

    } else {
      let data = { ...formData, locations, categories, img: image.name }
      handleUpload()
      addCourse(data, currentUser?.token)
        .then((res) => {
          setStep((prev) => prev + 1);

        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401)
            navigate("/login")
        });
    }
  };




  return (
    <div className="form-add-course" >
      <Steps.Root defaultStep={0} count={3} colorPalette="teal" color="white">
        <h1 className="title">{status === "EDIT" ? "- UPDATE " : "- ADD "}COURSE -</h1>
        <div style={{
          padding: "10px",
          left: 0,
          width: '100%',
        }}>


          <StepsList m>
            <StepsItem index={0} title="Step 1" />
            <StepsItem index={1} title="Step 2" />
            <StepsItem index={2} title="Step 3" />
          </StepsList></div>


        {/* === שלב 1 === */}
        {step === 0 && (
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}
          >
            <Card.Root border="0px" width="100%" maxWidth="500px" className="step">
              <Card.Header>
                <Card.Title>Step 1</Card.Title>
              </Card.Header>

              <Card.Body>
                <Stack gap="4" w="full">
                  <Field label="Name">
                    <Input
                      defaultValue={status === "EDIT" ? details.course.name : ""}
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" },
                      })}
                    />
                  </Field>

                  <Field label="Describe">
                    <Textarea
                      defaultValue={status === "EDIT" ? details.course.describe : ""}
                      {...register("describe", {
                        required: "Describe is required",
                        minLength: { value: 25, message: "Describe must be at least 25 characters" },
                      })}
                    />
                  </Field>

                  <Field label="Motivation">
                    <Textarea
                      defaultValue={status === "EDIT" ? details.course.motivation : ""}
                      {...register("motivation", {
                        required: "Motivation is required",
                        minLength: { value: 25, message: "Motivation must be at least 25 characters" },
                      })}
                    />
                  </Field>
                </Stack>
                {/* הצגת שגיאות בצורה מסודרת */}
                <div className="error-container">
                  {firstError && (
                    <Grow in={Boolean(firstError)} timeout={500} key={firstError}>
                      <Alert severity="error" className="error-show" >
                        {firstError}
                      </Alert>
                    </Grow>
                  )}
                </div>
              </Card.Body>


            </Card.Root>
          </form>
        )}




        {/* === שלב 2 === */}
        {step === 1 && (
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}
          >
            <Card.Root border="0px" width="500px" className="step1">
              <Card.Header>
                <Card.Title>Step 2</Card.Title>
              </Card.Header>

              <Card.Body>
                <Stack gap="4" w="full" >
                  <Field label="Opening Date">
                    <Input
                      defaultValue={status === "EDIT" ? details.course.openingDate?.substring(0, 10) : ""}
                      type="date"
                      {...register("openingDate", {
                        required: "Opening Date is required",
                        validate: (value) => {
                          const selectedDate = new Date(value);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0); // איפוס שעות היום להשוואה מדויקת
                          return selectedDate > today || "Opening Date must be in the future";
                        },
                      })}
                      min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]} // הגדרת מינימום לתאריך של מחר
                    />
                  </Field>

                  <Field label="Course Length">
                    <Input
                      defaultValue={status === "EDIT" ? details.course.long : ""}
                      type="number"
                      {...register("long", {
                        required: "Course length is required",
                        min: { value: 3, message: "long must be least 3" },
                        max: { value: 50, message: "long must be max 50" },
                      })}
                    />
                  </Field>

                  <Field label="Price">
                    <Input
                      defaultValue={status === "EDIT" ? details.course.price : ""}
                      type="text"
                      {...register("price", {
                        required: "Price is required",
                        validate: (value) =>
                          parseFloat(value) > 200 ? true : "Price must be above 200",
                      })}
                    />
                  </Field>
                </Stack>
                <div className="error-container">
                  {secondError && (
                    <Grow in={Boolean(secondError)} timeout={500} key={secondError}>
                      <Alert severity="error" className="error-show">
                        {secondError}
                      </Alert>
                    </Grow>
                  )}
                </div>
              </Card.Body>



            </Card.Root>
          </form>
        )}






        {/* === שלב 3 === */}
        {step === 2 && (
          <form
            onSubmit={(e) => e.preventDefault()}
          >

            <Card.Root className="step2">
              <Card.Header>
                <Card.Title>Step 3</Card.Title>
              </Card.Header>


              {/* <Card.Body> */}
              <Stack gap="4" w="full"  >
                <Flex gap={2} padding="30px" marginBottom="-50px">

                  <Field label="Image" flex={2}>
                    <div style={{ textAlign: "center", padding: "20px" }}>
                      <label htmlFor="file-upload" style={{ cursor: "pointer", backgroundColor: "white", color: "black", marginLeft: "-50px", padding: "10px 20px", borderRadius: "5px" }}>
                        Choose file
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />

                      {preview && (
                        <div
                          style={{
                            margin: "20px auto",
                            width: "200px",
                            height: "200px",
                            border: "2px dashed #aaa",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        </div>
                      )}
              
                    </div>
                  </Field>



                  <Field label="Locations" flex={2}>


                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
                      >
                        <Input
                          type="text"
                          {...register(`locations.${index}.location`, { required: "Location is required" })}
                        /> {index !== 0 &&
                          <Button type="button" onClick={() => remove(index)} style={{ width: "60px", backgroundColor: "white", color: "black" }}>
                            Remove
                          </Button>}
                      </div>
                    ))}

                    <Button type="button" onClick={() => append({ location: "" })} style={{ backgroundColor: "white", color: "black" }}>
                      + Add Location
                    </Button>
                    {errors.locations && (
                      <span className="error-message">{errors.locations.message}</span>
                    )}


                  </Field>


                </Flex>
                <Field label="Categories" flex={3} width="50%" >
                  <Controller
                    name="categories"
                    control={control}
                    rules={{
                      required: "Categories are required"  // הוספת כלל חובה
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categories}
                        isMulti
                        defaultValue={categoriesArray?.map(cat => ({
                          value: cat.toUpperCase(),
                          label: cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase(),
                        }))}
                        placeholder="Select categories..."
                        onChange={selectedOptions => field.onChange(selectedOptions)}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            color: "black",
                            backgroundColor: "white",
                            borderColor: state.isFocused ? "#ffffff" : "#cccccc",  // צבע גבול אם יש פוקס
                            outline: "none",  // ביטול הקו החיצוני
                            boxShadow: state.isFocused ? "0 0 10px rgba(196, 198, 200, 0.5)" : "none", // הצללה עדינה אם יש פוקס
                            borderWidth: "0px", // גבול בעובי 2px
                            transition: "all 0.3s ease-in-out", // אפקט מעבר חלק
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: 'black',  // הגדרת צבע הטקסט של הערך שנבחר
                          }),
                          multiValue: (base) => ({
                            ...base,
                            color: 'black',  // צבע הטקסט של הערכים שנבחרו
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: 'black',  // צבע הטקסט של ההוראות (placeholder)
                          }),
                          option: (base) => ({
                            ...base,
                            color: 'black',  // צבע הטקסט של כל אפשרות ברשימה
                          }),
                        }}
                      />
                    )}
                  />
                  {errors.categories && <span className="error-message">{errors.categories.message}</span>}

                </Field>








              </Stack>
            </Card.Root>

          </form>
        )}


        {/* === הודעה סופית אחרי שליחה === */}
        {step === 3 && <h3 className="end">The course was successfully{status === "EDIT" ? " update!!!" : " added!!!"}</h3>}

        {/* === כפתורי ניווט === */}
        <Group >
          {/* כפתור חזרה */}
          {step > 0 && step < 3 && (
            <StepsPrevTrigger asChild>
              <Button className="btn-add1" variant="outline" size="sm" onClick={prevStep}  >
                Prev
              </Button></StepsPrevTrigger>
          )}

          {/* כפתור Next (שלבים 0 ו-1) */}
          {step < 2 && (

            <StepsNextTrigger asChild>
              <Button className="btn-add2" variant="outline" size="sm" onClick={nextStep} disabled={!isValid || !isDirty}>
                Next
              </Button></StepsNextTrigger>
          )}

          {/* כפתור Submit (שלב 2) */}
          {step === 2 && (
            <StepsNextTrigger>
              <Button className="btn-add2" variant="solid" size="sm" onClick={onSubmit} disabled={!isValid || !isDirty}>
                Submit
              </Button>
            </StepsNextTrigger>
          )}


        </Group>
      </Steps.Root>

    </div>
  );
};

export default AddCourseForm;










