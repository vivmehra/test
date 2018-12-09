import React, { PureComponent } from 'react';
import './StudentList.css';
import ErrorMessage from './ErrorMessage';

export default class InputForm extends PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<form className="form-inline p-3" id="addStudent">
					<div className="form-group mb-2">
						{this.props.data.formType == 'add' ? (
							<label htmlFor="sname" className="m-2">
								Student Name <sup className="mandatory">*</sup>
							</label>
						) : null}
						<input
							type="text"
							id="sname"
							className="form-control"
							placeholder="Enter Student Name"
							onChange={(e) => this.props.data.onChangeHandler(e)}
							// onKeyPress={(e) => this.props.data.handleKeyPress(e)}
							ref={(input) => {
								this.studentNameField = input;
							}}
							maxLength="255"
							defaultValue={this.props.data.studentData ? this.props.data.studentData.studentName : ''}
						/>
					</div>
					<div className="form-group mx-sm-3 mb-2">
						{this.props.data.formType == 'add' ? (
							<label htmlFor="score" className="m-2">
								Marks Obtained <sup className="mandatory">*</sup>
							</label>
						) : (
							<span className="emptyLabel">&nbsp;</span>
						)}
						<input
							type="text"
							className="form-control"
							id="score"
							placeholder="Score"
							onChange={(e) => this.props.data.onChangeHandler(e)}
							// onKeyPress={(e) => this.props.data.handleKeyPress(e)}
							ref={(input) => {
								this.scoreField = input;
							}}
							maxLength="5"
							defaultValue={this.props.data.studentData ? this.props.data.studentData.score : ''}
						/>
					</div>
					{this.props.data.formType == 'add' ? (
						<button
							type="button"
							onClick={(e) => this.props.data.addStudent(e, this.studentNameField, this.scoreField)}
							className="btn btn-success mb-2"
						>
							Add Student
						</button>
					) : (
						<span>
							<span className="emptyLabel">&nbsp;</span>
							<span className="emptyLabel">&nbsp;</span>
							<button
								type="button"
								className="btn btn-primary"
								onClick={(e) =>
									this.props.data.updateClick(
										e,
										this.studentNameField.value.trim(),
										this.scoreField.value.trim()
									)}
							>
								Update
							</button>
						</span>
					)}
				</form>
				{this.props.data.isInvalid === 1 && (
					<small>
						<ErrorMessage message={this.props.data.message} />
					</small>
				)}
			</div>
		);
	}
}
// const InputForm = (props) => {
// 	return (
// 		<form className="form-inline p-3" id="addStudent">
// 			<div className="form-group mb-2">
// 				<label htmlFor="sname" className="m-2">
// 					Student Name <sup className="mandatory">*</sup>
// 				</label>
// 				<input
// 					type="text"
// 					id="sname"
// 					className="form-control"
// 					placeholder="Enter Student Name"
// 					onChange={(e) => props.data.onChangeHandler(e)}
// 					onKeyPress={(e) => props.data.handleKeyPress(e)}
// 					// ref={(input) => {
// 					// 	this.studentNameField = input;
// 					// }}
// 					maxLength="255"
// 				/>
// 			</div>
// 			<div className="form-group mx-sm-3 mb-2">
// 				<label htmlFor="score" className="m-2">
// 					Marks Obtained <sup className="mandatory">*</sup>
// 				</label>
// 				<input
// 					type="text"
// 					className="form-control"
// 					id="score"
// 					placeholder="Score"
// 					onChange={(e) => props.data.onChangeHandler(e)}
// 					onKeyPress={(e) => props.data.handleKeyPress(e)}
// 					// ref={(input) => {
// 					// 	this.scoreField = input;
// 					// }}
// 					maxLength="5"
// 				/>
// 			</div>
// 			<button type="button" onClick={(e) => props.data.addStudent(e)} className="btn btn-success mb-2">
// 				Add Student
// 			</button>
// 		</form>
// 	);
// };

// export default InputForm;
