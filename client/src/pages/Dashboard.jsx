import Card from "../components/cards";
import Table from "../components/table";
import "../styles/dashboard.css";

function Dashboard() {

    const headers = [
        "Student No",
        "Name",
        "Status"
    ];

    const data = [
        ["22114587","John Smith","Present"],
        ["22114588","Sarah Jones","Absent"],
        ["22114589","Mike Brown","Present"],
        ["22114590","Emily White","Late"]
    ];

    return (

        <>

            <h1 className="title">Dashboard</h1>

            <div className="cards">

                <Card title="Students" value="350"/>

                <Card title="Present" value="320"/>

                <Card title="Absent" value="30"/>

                <Card title="Attendance" value="91%"/>

            </div>

            <div className="dashboard-grid">

                <div className="chart">

                    <h2>Attendance Overview</h2>

                    <div className="chart-box">
                        Chart goes here
                    </div>

                </div>

                <div className="recent">

                    <h2>Recent Attendance</h2>

                    <Table
                        headers={headers}
                        data={data}
                    />

                </div>

            </div>

        </>

    );

}

export default Dashboard;