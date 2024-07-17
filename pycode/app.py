import pandas as pd
import json

def main():
    quiz_weight = 0.25
    homework_weight = 0.10
    exam_weight = 0.65

    #average_grades
    quiz1 = pd.read_csv("files/quiz_1_grades.csv", usecols=['Last Name', 'First Name', 'Grade', 'SID'])
    quiz2 = pd.read_csv("files/quiz_2_grades.csv", usecols=['Grade', 'SID'])
    merged_quizes = pd.merge(quiz1, quiz2, on='SID')
    merged_quizes['average_grades'] = (merged_quizes['Grade_x'] + merged_quizes['Grade_y']) / 2
    grades = merged_quizes[['Last Name', 'First Name', 'SID', 'average_grades']]
    # print(grades)

    #average_homework and exam
    homework_exams = pd.read_csv("files/Homework and exams.csv", usecols=['Last Name', 'First Name', 'SID', 'Homework 1', 'Homework 2', 'Homework 3', 'Exam'])
    homework_exams['average_homework'] = (homework_exams['Homework 1'] + homework_exams['Homework 2'] + homework_exams['Homework 3']) / 3
    homework_exams_final = homework_exams[['Last Name', 'First Name', 'SID', 'average_homework', 'Exam']]
    # print(homework_exams_final)

    #get students
    students = pd.read_json(get_students())
    students['NetID'] = students['NetID'].str.lower()

    # print(students)

    #join with group
    merged_homework_exams_with_groups = pd.merge(students, homework_exams_final, left_on='NetID', right_on='SID')
    merged_data = pd.merge(merged_homework_exams_with_groups, grades, on='SID')
    # print(merged_data)

    #final data
    merged_data['final_grade'] = (merged_data['average_grades'] * quiz_weight) + (merged_data['average_homework'] * homework_weight) + (merged_data['Exam'] * exam_weight) 
    final_data = merged_data[['Name', 'ID', 'final_grade', 'Group']]
    final_data = final_data.sort_values("final_grade", ascending=False).groupby('Group')
    write_excel(final_data)


def get_students():
    with open('files/Students.json') as file:
        data = json.load(file)
    return data

def write_excel(df):
    with pd.ExcelWriter('output/results.xlsx', engine='xlsxwriter') as writer:
        df.get_group(1).to_excel(writer, sheet_name='group1')
        df.get_group(2).to_excel(writer, sheet_name='group2')
        df.get_group(3).to_excel(writer, sheet_name='group3')

    
if __name__ == "__main__":
    main()