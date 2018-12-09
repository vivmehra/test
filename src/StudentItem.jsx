/* Child Component to show each row for each studenet data and 
pass control to parent component for edit, delete and update functionalities*/
import React, { Component } from 'react';
import './StudentList.css';
import { inputDataErrorMessageUtil } from './Utilities';
import TableRowView from './TableRowView';
import InputForm from './InputForm';

export default class StudentItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditClicked: false,
			isInvalid: 0
		};
		this.name = this.props.studentData.studentName;
		this.score = this.props.studentData.score;
	}
	/* Pass the key to delete, to the parent component*/
	onDeleteClick = () => {
		this.props.studentData.onDeleteClick(this.props.studentData.key);
	};
	onEditClick = () => {
		this.setState({
			isEditClicked: true
		});
	};
	updateClick = (e, name, score) => {
		var regex = /^([a-zA-Z' ]){0,255}$/;
		if (name === '' || !regex.test(name) || score === '' || score < 0 || score > 100 || isNaN(score)) {
			this.ErrorMessage = inputDataErrorMessageUtil(name, score);
			this.setState({
				isInvalid: 1
			});
			return;
		}
		let studentsList = this.props.studentData.studentsList;
		let indexOfStudent = '';
		let isExist = false;

		for (var i = 0; i < studentsList.length; i++) {
			if (studentsList[i].studentName === this.props.studentData.studentName) indexOfStudent = i;
		}
		for (var j = 0; j < studentsList.length; j++) {
			if (j !== indexOfStudent) {
				if (studentsList[j].studentName === name) {
					isExist = true;
					break;
				}
			}
		}
		if (isExist) {
			this.ErrorMessage = `Student with name '${name}' already exists`;
			this.setState({
				isInvalid: 1
			});
			return;
		} else {
			this.props.studentData.updateClick(this.props.studentData.key, name, score);
			this.setState({
				isEditClicked: false,
				isInvalid: 0
			});
		}
	};

	onChangeHandler = (e) => {
		let value = e.target.value.trim();
		if (e.target.id === 'sname') {
			this.name = value === '' ? '' : value;
		} else {
			this.score = value === '' ? '' : value;
		}
	};
	handleKeyPress = (e) => {
		if (e.charCode === 13) {
			var regex = /^([a-zA-Z' ]){0,255}$/;
			if (
				this.name === '' ||
				!regex.test(this.name) ||
				this.score === '' ||
				this.score < 0 ||
				this.score > 100 ||
				isNaN(this.score)
			) {
				this.setState({
					isInvalid: 1
				});
			}
			this.updateClick(e, this.name, this.score);
		}
	};
	render() {
		const studentData = this.props.studentData;
		let divElement = '';
		const rowViewProps = {
			studentData: studentData,
			onDeleteClick: this.onDeleteClick,
			onEditClick: this.onEditClick
		};
		const rowEditProps = {
			studentData: studentData,
			onChangeHandler: this.onChangeHandler,
			updateClick: this.updateClick,
			message: this.ErrorMessage,
			isInvalid: this.state.isInvalid,
			handleKeyPress: this.handleKeyPress
		};
		if (!this.state.isEditClicked) {
			divElement = <TableRowView data={rowViewProps} />;
		}
		if (this.state.isEditClicked) {
			divElement = <InputForm data={rowEditProps} />;
		}
		return <div>{divElement}</div>;
	}
}
