import React from 'react';
import axios from 'axios';
import Router from 'next/router';

class EmployeesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: props.employees
        }
    }

    logout = async () => {
        try {
            await axios.get('/api/logout')
            Router.push('/')
        } catch (err) {
            console.log(err);
        }
    }

    crawlEmployees = async () => {
        try {
            const res = await axios.get('/api/employees/crawl')
            this.setState({
                employees: res.data
            })

        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { employees } = this.state;

        return (
            <>
                <button onClick={() => this.logout()}>logout</button>
                <button onClick={() => this.crawlEmployees()}>crawl</button>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0
                            ? employees.map((empl, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{empl.employee_name}</td>
                                        <td>{empl.employee_age}</td>
                                        <td>{empl.employee_salary}</td>
                                    </tr>
                                )
                            })
                            : <tr><td colSpan={3}>no data</td></tr>
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export async function getServerSideProps(ctx) {
    if (ctx.req.session) {
        const res = await axios.get("http://localhost:3000/api/employees");
        console.log(res);
        return {
            props: {
                employees: res.data
            }
        };
    } else {
        ctx.res.writeHead(301, {
            Location: "/login",
        });
        return { props: {} };
    }
}

export default EmployeesList;