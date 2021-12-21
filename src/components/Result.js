import logo from "../logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, InputGroup, Button, Card } from "react-bootstrap";
import "../App.css";
import GetApi from "../services/Api";
import React, { useState, useEffect, useMemo } from "react";

const Result = () => {
  const [provinces, setProvince] = useState([]);
  const [provinceID, setProvinceID] = useState();
  const [regencies, setRegencies] = useState([]);
  const [regenciesID, setRegenciesID] = useState();
  const [districts, setDistricts] = useState([]);
  const [districtsID, setDistrictsID] = useState();
  const [villages, setVillages] = useState([]);
  const [villagesID, setVillagesID] = useState();
  const [validated, setValidated] = useState(false);

  const [messageFile, setmessageFile] = useState([]);
  const [messageFileType, setmessageFileType] = useState([]);
  const [filesize, setfilesize] = useState(0);
  useEffect(() => {
    GetApiProvinces();
    GetApiregencies(provinceID);
    GetApidistricts(regenciesID);
    GetApivillages(districtsID);
    console.log(filesize);
    console.log(provinceID);
  }, [provinceID, regenciesID, districtsID]);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const GetApiProvinces = () => {
    GetApi.getProvinces()
      .then((response) => {
        const newJSON = response.data;
        setProvince(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const GetApiregencies = (provinceID) => {
    GetApi.getRegencies(provinceID)
      .then((response) => {
        const newJSON = response.data;
        setRegencies(newJSON);
        console.log("regencies");
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const GetApidistricts = (regenciesID) => {
    GetApi.getDistricts(regenciesID)
      .then((response) => {
        const newJSON = response.data;
        setDistricts(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const GetApivillages = (districtsID) => {
    GetApi.getVillages(districtsID)
      .then((response) => {
        const newJSON = response.data;
        setVillages(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fileChangedHandler = (event) => {
    let file_size = event.target.files[0].size;

    //or if you like to have name and type
    let file_name = event.target.files[0].name;
    let file_type = event.target.files[0].type;
    console.log(file_size);
    if (file_size > 4000) {
      messageFile = "You must agree before submitting.";
      messageFileType = "Invalid";
    }
    //do whatever operation you want to do here
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}>
      <Card>
        <h3 style={{ textAlign: "center" }}>
          Form Penerima Bantuan Bansos Covid 19
        </h3>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Nama</Form.Label>
                <Form.Control required type="text" placeholder="Nama" />
                <Form.Control.Feedback type="invalid">
                  Nama wajib diisi
                </Form.Control.Feedback>
                <br />
                <Form.Label>NIK</Form.Label>
                <Form.Control required type="text" placeholder="NIK" />
                <Form.Control.Feedback type="invalid">
                  NIK wajib diisi
                </Form.Control.Feedback>
                <br />
                <Form.Label>Nomor Kartu Keluarga</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nomor Kartu Keluarga"
                />
                <Form.Control.Feedback type="invalid">
                  Nomor kartu keluarga wajib diisi
                </Form.Control.Feedback>
                <br />
                <Form.Label>Foto KTP</Form.Label>
                <Form.Control
                  required
                  type="file"
                  onChange={(e) => {
                    setfilesize(e.target.files[0].size);
                  }}
                />
                <Form.Control.Feedback
                  type={filesize > 2000000 ? "invalid" : "valid"}>
                  {filesize > 2000000 ? "File maximal 2 mb" : ""}
                </Form.Control.Feedback>
                <br />
                <Form.Label>Foto Kartu Keluarga</Form.Label>
                <Form.Control required type="file" />
                <br />
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select required>
                  <option value="0">Laki-Laki</option>
                  <option value="1">Perempuan</option>
                </Form.Select>
                <br />
                <Form.Label>Provinsi</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => {
                    setProvinceID(e.target.value);
                  }}>
                  {provinces.map((data) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
                </Form.Select>
                <br />
                <Form.Label>Kab/Kota</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => {
                    setRegenciesID(e.target.value);
                  }}>
                  {regencies.map((data) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
                </Form.Select>
                <br />
                <Form.Label>Kecamatan</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => {
                    setDistrictsID(e.target.value);
                  }}>
                  {districts.map((data) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
                </Form.Select>
                <br />
                <Form.Label>Kelurahan/Desa</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => {
                    setVillagesID(e.target.value);
                  }}>
                  {villages.map((data) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
                </Form.Select>
                <br />
                <Form.Label>Alamat</Form.Label>
                <Form.Control required as="textarea" rows={3} />
                <Form.Control.Feedback type="invalid">
                  Alamat wajib diisi
                </Form.Control.Feedback>
                <br />
                <Form.Label>RT</Form.Label>
                <Form.Control required type="text" placeholder="RT" />
                <Form.Control.Feedback type="invalid">
                  RT wajib diisi
                </Form.Control.Feedback>
                <br />
                <Form.Label>RW</Form.Label>
                <Form.Control required type="text" placeholder="RW" />
                <Form.Control.Feedback type="invalid">
                  RW wajib diisi
                </Form.Control.Feedback>
                <br />
                <Form.Label>Penghasilan Sebelum Pandemi</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Penghasilan Sebelum Pandemi"
                />
                <Form.Control.Feedback type="invalid">
                  Data wajib diisi
                </Form.Control.Feedback>
                <br />
                <Form.Label>Penghasilan Setelah Pandemi</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Penghasilan Setelah Pandemi"
                />
                <Form.Control.Feedback type="invalid">
                  Data wajib diisi
                </Form.Control.Feedback>
                <br />
                <Form.Label>Alasan Membutuhkan Bantuan</Form.Label>
                <Form.Select required>
                  <option value="0">Kehilangan pekerjaan</option>
                  <option value="1">
                    Kepala keluarga terdampak atau korban Covid-19
                  </option>
                  <option value="2">
                    Tergolong fakir/miskin semenjak sebelum Covid-19
                  </option>
                  <option value="3">Lainnya</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut."
                feedback="Persetujuan wajib di cheklist."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Result;
