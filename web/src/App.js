/*
MIT License

Copyright (c) 2022 r7wx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import ServiceSection from "./components/ServiceSection";
import Error from "./components/Error";
import { Helmet } from "react-helmet";
import Note from "./components/Note";
import axios from "axios";

library.add(fas, far, fab);

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: "",
    icon: "",
    motd: "",
    services: [],
    notes: [],
    theme: {
      background: "#FFFFFF",
      foreground: "#000000",
    },
  });

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/api/data")
        .then(async (res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((_) => {
          setLoading(true);
        });
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {!loading ? (
        <main className="py-6 px-12">
          <container>
            <Helmet>
              {data.title && <title>{data.title}</title>}
              {data.theme && (
                <style>
                  {`body { background-color: ${data.theme.background}; 
                color: ${data.theme.foreground}}`}
                </style>
              )}
            </Helmet>
            <h1 className="text-4xl">
              <FontAwesomeIcon icon={data.icon} /> {data.title}
            </h1>
            <p className="text-base">{data.motd}</p>
            {data.error.length > 0 &&
              <Error error={data.error} />
            }
            {data.services.length > 0 &&
              <ServiceSection services={data.services} categories={data.categories} />
            }
            {data.notes.length > 0 && (
              <React.Fragment>
                <h3 className="text-xl mt-5">
                  <FontAwesomeIcon icon="fa-regular fa-note-sticky" /> Notes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mt-5">
                  {data.notes.map((note) => (
                    <Note key={note.title} note={note} />
                  ))}
                </div>
              </React.Fragment>
            )}
          </container>
        </main>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
}

export default App;
