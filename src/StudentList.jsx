/* Component to add Student Info and
   Call StudentItem iteratively on the basis of number of students added. */

import React, { Component } from 'react';
import './StudentList.css';
import StudentItem from './StudentItem';
// import ErrorMessage from './ErrorMessage';
import { inputDataErrorMessageUtil, calculateSummaryDataUtil } from './Utilities';
import ClassSummary from './ClassSummary';
import TableHeader from './TableHeader';
import InputForm from './InputForm';

export default class StudentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentsList: [],
			isInvalid: 0
		};
		this.name = '';
		this.score = '';
	}
	/*  Function calling util function to get min max and avg value */
	calculateSummaryData = (studentsList) => {
		let summaryData = calculateSummaryDataUtil(studentsList);
		this.min = summaryData.min;
		this.max = summaryData.max;
		this.avg = summaryData.avg;
	};

	/*  Function to delete corresponding student data, data passed by child component*/
	onDeleteClick = (index) => {
		let studentsList = [ ...this.state.studentsList ];
		studentsList.splice(index, 1);
		this.setState({
			studentsList: studentsList
		});
		this.calculateSummaryData(studentsList);
	};

	onChangeHandler = (e) => {
		let value = e.target.value.trim();
		if (e.target.id === 'sname') {
			this.name = value === '' ? '' : value;
		} else {
			this.score = value === '' ? '' : value;
		}
	};
	addStudent = (e, studentNameField, scoreField) => {
		var regex = /^([a-zA-Z' ]){0,255}$/;
		if (
			this.name === '' ||
			!regex.test(this.name) ||
			this.score === '' ||
			this.score < 0 ||
			this.score > 100 ||
			isNaN(this.score)
		) {
			this.ErrorMessage = inputDataErrorMessageUtil(this.name, this.score);
			this.setState({
				isInvalid: 1
			});
			return;
		} else {
			let studentData = {
				studentName: this.name,
				score: Number(this.score)
			};
			let studentsList = [ ...this.state.studentsList ];

			let duplicateStudents = studentsList.filter((student) => {
				return student.studentName === this.name;
			});
			if (duplicateStudents.length === 0) {
				studentsList.push(studentData);
				this.setState({
					studentsList: studentsList,
					isInvalid: 0
				});
				this.calculateSummaryData(studentsList);
				this.name = this.score = '';
				studentNameField.value = scoreField.value = '';
				studentNameField.focus();
			} else {
				this.ErrorMessage = `Student with name '${this.name}' already exists`;
				this.setState({
					isInvalid: 1
				});
				return;
			}
		}
	};

	updateClick = (key, name, score) => {
		const studentsList = [ ...this.state.studentsList ];
		studentsList[key] = {
			studentName: name,
			score: Number(score)
		};
		this.setState({
			studentsList: studentsList,
			isInvalid: 0
		});
		this.calculateSummaryData(studentsList);
	};
	/* Function to add student on enterkey stroke*/
	handleKeyPress(e, studentNameField, scoreField) {
		if (e.charCode === 13) {
			if (this.name === '' || this.score === '') {
				this.setState({
					isInvalid: 1
				});
			}
			this.addStudent(e, studentNameField, scoreField);
		}
	}
	render() {
		const studentsList = [ ...this.state.studentsList ];
		let studentData = '';
		const summaryProps = {
			min: this.min,
			max: this.max,
			avg: this.avg
		};
		let inputFormProps = {
			onChangeHandler: this.onChangeHandler,
			handleKeyPress: this.handleKeyPress,
			addStudent: this.addStudent,
			formType: 'add',
			message: this.ErrorMessage,
			isInvalid: this.state.isInvalid
		};
		return (
			<div className="container-fluid mt-2" id="main-container">
				<InputForm key="add" data={inputFormProps} />

				{studentsList.length > 0 && <ClassSummary data={summaryProps} />}

				{/* Table Header*/}
				{studentsList.length > 0 && <TableHeader />}

				{/* Iteratively Calling StudentItem component to add each row for the students array */}
				{studentsList.map((student, index) => {
					studentData = {
						...student,
						key: index,
						onDeleteClick: this.onDeleteClick,
						updateClick: this.updateClick,
						validateInputData: this.validateInputData,
						studentsList: studentsList
					};
					return (
						<div className="container-fluid" key="index">
							<StudentItem studentData={studentData} />
						</div>
					);
				})}
			</div>
		);
	}
}
