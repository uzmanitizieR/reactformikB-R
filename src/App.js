import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='brand-box'>
        <h1>Magic Form</h1>
      </div>

      <div className='magic-form'>
        <Formik
          initialValues={{
            name: "",
            email: "",
            agree: false,
            favoriteColor: ""
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("İsim boş bırakılamaz"),
            email: Yup.string()
              .email("Geçerli bir email giriniz")
              .required("Email boş bırakılamaz"),
            agree: Yup.boolean()
              .oneOf([true], "Şartı kabul etmelisiniz"),
            favoriteColor: Yup.string()
              .required("Herkesin sevdiği bir renk vardır")
              .oneOf(["red", "blue", "green"], "Geçerli bir renk seçin")
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              resetForm();
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            dirty,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <h1>Kaydol</h1>
              
              <label htmlFor='name'>İsim</label>
              <input
                id='name'
                type='text'
                placeholder='melih'
                className='input'
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
              
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                placeholder='melih@example.com'
                className='input'
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
              
              <label htmlFor='favoriteColor'>Renk</label>
              <select
                id='favoriteColor'
                value={values.favoriteColor}
                onChange={handleChange}
              >
                <option value="" label='Renk seç'></option>
                <option value="red" label='Kırmızı'></option>
                <option value="blue" label='Mavi'></option>
                <option value="green" label='Yeşil'></option>
              </select>
              {errors.favoriteColor && touched.favoriteColor && <div className="input-feedback">{errors.favoriteColor}</div>}
              
              <div className='checkbox'>
                <input
                  type='checkbox'
                  id='agree'
                  value={values.agree}
                  onChange={handleChange}
                />
                <label htmlFor='agree' className='checkbox-label'>Sözleşmeyi okudum kabul ediyorum</label>
              </div>
              
              <button type='submit' disabled={!dirty || isSubmitting}>Gönder</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
