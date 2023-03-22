import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "../index.css";

import { useDispatch, useSelector } from "react-redux";
import {
  setValueFunction,
  setValueClass,
  setValuePackage,
  setGraphDisable
} from "../redux/counter";

import axios from "axios";

import {
  Descriptions,
  Space,
  TreeSelect,
  Statistic,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Popconfirm,
  message
} from "antd";

import FileInput from "../components/FileInput";
import useFetch from "../components/useFetch";
import CodeEditor from "@uiw/react-textarea-code-editor";

function Metrics() {
  const { functionGraphData, classGraphData, packageGraphData } = useSelector(
    (state) => state.counter
  );

  const dispatch = useDispatch();

  const Base64 = require("js-base64");
  const [url, setUrl] = useState(" ");
  const [code, setCode] = useState(` `);
  const [selectedClass, setSelectedClass] = useState(" ");
  const [recordsArray, setRecordsArray] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [fileData, setfileData] = useState();
  const [fileID, setFileID] = useState();
  const [fileDataContent, setfileDataContent] = useState(" ");
  const { error, isPending, data } = useFetch(url);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(` `);
  const [noOfClassDependency, setNoOfClassDependency] = useState(` `);
  const [noOfPackageDependency, setNoOfPackageDependency] = useState(` `);
  const [totalLinesOfCode, setTotalLinesOfCode] = useState(` `);
  const [noOfobjectInstance, setNoOfobjectInstance] = useState(` `);
  const [noOfimportLibraries, setNoOfimportLibraries] = useState(` `);
  const [noOfFunction, setNoOfFunction] = useState(` `);
  const [functionalDependencyGraph, setFunctionalDependencyGraph] = useState(
    ` `
  );
  const [classDependencyGraph, setClassDependencyGraph] = useState(` `);
  const [packageDependencyGraph, setPackageDependencyGraph] = useState(` `);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function inputFileValue(file) {
    setfileData(file[0]);
  }

  useEffect(() => {
    var selectedRecordCode = "";
    var noOfFunction = "";
    var name = "";
    var totalLinesOfCode = "";
    var noOfClassDependency = "";
    var noOfPackageDependency = "";
    var noOfimportLibraries = "";
    var noOfobjectInstance = "";
    var functionalDependencyGraph = "";
    var classDependencyGraph = "";
    var packageDependencyGraph = "";

    for (var i = 0; i < recordsArray.length; i++) {
      var recordName = Base64.decode(recordsArray[i].fields.Name);

      if (recordName === selectedClass) {
        selectedRecordCode = recordsArray[i].fields.fileContent;
        noOfFunction = recordsArray[i].fields.noOfFunction;
        name = recordsArray[i].fields.Name;
        totalLinesOfCode = recordsArray[i].fields.totalLinesOfCode;
        noOfClassDependency = recordsArray[i].fields.noOfClassDependency;
        noOfPackageDependency = recordsArray[i].fields.noOfPackageDependency;
        noOfimportLibraries = recordsArray[i].fields.noOfimportLibraries;
        noOfobjectInstance = recordsArray[i].fields.noOfobjectInstance;
        functionalDependencyGraph =
          recordsArray[i].fields.functionalDependencyGraph;
        classDependencyGraph = recordsArray[i].fields.classDependencyGraph;
        packageDependencyGraph = recordsArray[i].fields.packageDependencyGraph;
      }
    }

    setCode(Base64.decode(selectedRecordCode));
    setName(Base64.decode(name));
    setNoOfClassDependency(Base64.decode(noOfClassDependency));
    setNoOfPackageDependency(Base64.decode(noOfPackageDependency));
    setTotalLinesOfCode(Base64.decode(totalLinesOfCode));
    setNoOfobjectInstance(Base64.decode(noOfobjectInstance));
    setNoOfimportLibraries(Base64.decode(noOfimportLibraries));
    setNoOfFunction(Base64.decode(noOfFunction));
    setFunctionalDependencyGraph(Base64.decode(functionalDependencyGraph));
    setClassDependencyGraph(Base64.decode(classDependencyGraph));
    setPackageDependencyGraph(Base64.decode(packageDependencyGraph));

    dispatch(setValueFunction(Base64.decode(functionalDependencyGraph)));
    dispatch(setValueClass(Base64.decode(classDependencyGraph)));
    dispatch(setValuePackage(Base64.decode(packageDependencyGraph)));
  }, [selectedClass]);

  function selectValueChange(input) {
    setSelectedClass(input);
    dispatch(setGraphDisable(false));
  }

  function loadAnalyzedData() {
    axios({
      method: "get",
      url: "https://v1.nocodeapi.com/naney/airtable/EXCBOFacEUotZBCI",
      params: { tableName: "result" }
    })
      .then(function (response) {
        // console.log(response.data);
        var jsonObj = response.data;
        var array = jsonObj.records;
        setRecordsArray(array);

        var tempArray = [];
        for (var i = 0; i < array.length; i++) {
          var fileNameBase64 = array[i].fields.Name;

          var fileName = Base64.decode(fileNameBase64);

          tempArray.push({ title: fileName, value: fileName });
        }
        setTreeData(tempArray);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    message.success("Analyzed Data is loaded");
  }

  function cancel() {
    message.error("Analyzed Data not loaded");
  }

  const handleSubmit = (e) => {
    var fr = new FileReader();
    fr.onload = function (e) {
      // e.target.result should contain the text
      var text = e.target.result;
      //encode string to base64

      setfileDataContent(Base64.encode(text));
    };
    fr.readAsText(fileData);

    axios({
      method: "post",
      url:
        "https://v1.nocodeapi.com/naney/airtable/EXCBOFacEUotZBCI?tableName=file",
      // params: {"typecast": true},
      //double quotes for data json !!!!!!
      data: [{ Name: fileData.name, content: fileDataContent }]
    })
      .then(function (response) {
        // handle success

        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    setIsModalVisible(false);
  };

  return (
    <div className="site-statistic-demo-card">
      <Card
        style={{
          paddingTop: "40px",
          width: 386,
          paddingBottom: "20px",
          marginBottom: "20px"
        }}
      >
        <FileInput inputFileValue={inputFileValue} />

        <Button type="primary" onClick={showModal}>
          Upload
        </Button>
        <Modal
          title="Confirmation"
          visible={isModalVisible}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          <p>Upload the following File?</p>
          {fileData && <p>File: {fileData.name}</p>}
          <p
            style={{
              paddingTop: "8px",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
          >
            Note: Proceed to DataBricks to run the notebook after the file is
            uploaded.
          </p>
        </Modal>

        <Popconfirm
          title="Load Analyzed Data into this Web Application?"
          onConfirm={loadAnalyzedData}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            shape="round"
            size="Default"
            style={{
              marginTop: "40px",
              marginBottom: "40px",
              marginLeft: "30px"
            }}
          >
            Load Data
          </Button>
        </Popconfirm>
      </Card>

      <Space direction="vertical" size="large">
        <Card
          title="Source Code Metrics Viewer (Class)"
          style={{ marginBottom: "20px", width: 706 }}
        >
          <TreeSelect
            style={{ width: "100%" }}
            value={selectedClass}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={treeData}
            placeholder="Please select a Class"
            treeDefaultExpandAll
            onChange={selectValueChange}
          />
        </Card>
      </Space>
      <Space direction="vertical" size="large" style={{ paddingBottom: 15 }}>
        <Descriptions title=" " bordered>
          <Descriptions.Item label="Class Name">{name}</Descriptions.Item>
          <Descriptions.Item label="No of Functions">
            {noOfFunction}
          </Descriptions.Item>
          <Descriptions.Item label="Lines of code">
            {totalLinesOfCode}
          </Descriptions.Item>
          <Descriptions.Item label="No of import libraries">
            {noOfimportLibraries}
          </Descriptions.Item>
          <Descriptions.Item label="No of Class Dependency">
            {noOfClassDependency}
          </Descriptions.Item>
          <Descriptions.Item label="No of Package Dependency">
            {noOfPackageDependency}
          </Descriptions.Item>
          <Descriptions.Item label="No of object instance">
            {noOfobjectInstance}
          </Descriptions.Item>
        </Descriptions>
      </Space>

      <Card>
        <CodeEditor
          value={code}
          language="php"
          placeholder="source code"
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          style={{
            fontSize: 14,
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
          }}
        />
      </Card>
    </div>
  );
}

export default Metrics;
