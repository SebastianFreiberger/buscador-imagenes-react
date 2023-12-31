import { useState } from "react";
import { Formik, Form, Field } from "formik";
import './Header.css'
import './Content.css'
import './article.css'

const App = () =>  {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({photos});
  return (
    <div>
      <header>
        <Formik
          initialValues={{search: ''}}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID n5PeXiFM5RBmGcwHu7CqYQHbfxqmm3QvGRjQdyno6DU'
              }
            })
            const data = await response.json()
            setPhotos(data.results);
            // llamar a api de unsplash            
          }}
        >
          <Form>            
            <Field name="search" placeholder="Buscar...">
              
            </Field>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map( photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={[photo.description, photo.alt_description].join('-')}/>
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
