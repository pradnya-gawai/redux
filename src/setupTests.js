// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
 import '@testing-library/jest-dom';
// import{cleanup} from 'react-testing-library'

import {cleanup} from '@testing-library/react'
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-enzyme';
import React from "react";
import Enzyme, { shallow, render, mount } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import sinon from "sinon";

// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

// React 16 Enzyme adapter
// Enzyme.configure({ adapter: new Adapter() });

// Define globals to cut down on imports in test files
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
global.cleanup= cleanup;

configure({ adapter: new Adapter() });