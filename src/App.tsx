import './App.global.css'
import styles from './App.module.css'
import { Table } from "antd";
import { createTrackingStore } from "./api/tracking.api";
import { useEffect } from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup } from "victory";
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto'; 
Chart.register(CategoryScale);

export const App = () => {
  const cvprofiles = createTrackingStore(state => state.cvprofiles)
  const dau = createTrackingStore(state => state.dau)
  const dropgamebyday = createTrackingStore(state => state.dropgamebyday)
  const getCVProfiles = createTrackingStore(state => state.getCVProfiles)
  const getDau = createTrackingStore(state => state.getDau)
  const getDropGameByDay = createTrackingStore(state => state.getDropGameByDay)
  const getMau = createTrackingStore(state => state.getMau)
  const getMeanMatchingGameByDay = createTrackingStore(state => state.getMeanMatchingGameByDay)
  const getQuizzByDay = createTrackingStore(state => state.getQuizzByDay)
  const mau = createTrackingStore(state => state.mau)
  const meanmatchingbyday = createTrackingStore(state => state.meanmatchingbyday)
  const quizzbyday = createTrackingStore(state => state.quizzbyday)

  const dataDailyActiveUser = {
    labels: dau.map((item: any) => item?._id),
    datasets: [
      {
        label: "Daily active user",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dau.map((item: any) => item?.activeUsers)
      },
    ]
  }

  const dataMonthlyActiveUser = {
    labels: mau.map((item: any) => item?._id),
    datasets: [
      {
        label: "Daily active user",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: mau.map((item: any) => item?.activeUsers)
      },
    ]
  }

  const uniqueUserAnswerQuizz = {
    labels: quizzbyday.map((item: any) => item?.date),
    datasets: [
      {
        label: "Total answer by date",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: quizzbyday.map((item: any) => item?.totalAnswers)
      },
    ]
  }

  const quizzByDay = {
    labels: quizzbyday.map((item: any) => item?.date),
    datasets: [
      {
        label: "Total unique users by date",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: quizzbyday.map((item: any) => item?.totalUniqueUsers)
      },

      {
        label: "Answer to user",
        backgroundColor: "rgba(155,231,91,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: quizzbyday.map((item: any) => item?.answersPerUser)
      }
    ]
  }

  const uniqueUserPlayDropGame = {
    labels: dropgamebyday.map((item: any) => item?.date),
    datasets: [
      {
        label: "Total answer by date",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dropgamebyday.map((item: any) => item?.totalAnswers)
      },
    ]
  }

  const dropGameByDay = {
    labels: dropgamebyday.map((item: any) => item?.date),
    datasets: [
      {
        label: "Total unique users by date",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dropgamebyday.map((item: any) => item?.totalUniqueUsers)
      },

      {
        label: "Answer to user",
        backgroundColor: "rgba(155,231,91,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dropgamebyday.map((item: any) => item?.answersPerUser)
      }
    ]
  }

  const uniqueUserPlayMeanMatching = {
    labels: meanmatchingbyday.map((item: any) => item?.date),
    datasets: [
      {
        label: "Total answer by date",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: meanmatchingbyday.map((item: any) => item?.totalAnswers)
      },
    ]
  }

  const meanMatchingGameByDay = {
    labels: meanmatchingbyday.map((item: any) => item?.date),
    datasets: [
      {
        label: "Total unique users by date",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: meanmatchingbyday.map((item: any) => item?.totalUniqueUsers)
      },

      {
        label: "Answer to user",
        backgroundColor: "rgba(155,231,91,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: meanmatchingbyday.map((item: any) => item?.answersPerUser)
      }
    ]
  }

  useEffect(() => {
    async function fetch() {
      await getCVProfiles()
      await getDau()
      await getDropGameByDay()
      await getMau()
      await getMeanMatchingGameByDay()
      await getQuizzByDay()
    }

    fetch()
  }, [])
  const options = {
    responsive: true,
    legend: {
      display: false
    },
    type: "bar"
  };
  
  const dataSource = cvprofiles;
  
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Link',
      dataIndex: 'email',
      key: 'email',
    },
  ];
  

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero content */}
      <div className="py-12 md:py-20">
        {/* Section header */}
        <div className="pb-12 text-center md:pb-20 big">
          <h1>Daily active user</h1>
          <Bar
            data={dataDailyActiveUser}
            options={options}
          />

          <h1>Monthly active user</h1>
          <Bar
            data={dataMonthlyActiveUser}
            options={options}
          />

          <h1>Quizz game</h1>
          <h3>Total quizz answered by date</h3>
          <Bar
            data={uniqueUserAnswerQuizz}
            options={options}
          />

          <h3>Quizz by date</h3>
          <Bar
            data={quizzByDay}
            options={options}
          />

          <h1>Drop game</h1>
          <h3>Total drop game played by date</h3>
          <Bar
            data={uniqueUserPlayDropGame}
            options={options}
          />

          <h3>Drop game by date</h3>
          <Bar
            data={dropGameByDay}
            options={options}
          />

          <h1>Mean matching game</h1>
          <h3>Total mean matching played by date</h3>
          <Bar
            data={uniqueUserPlayMeanMatching}
            options={options}
          />

          <h3>Mean matching by date</h3>
          <Bar
            data={meanMatchingGameByDay}
            options={options}
          />

          <h1>CV Profile</h1>
          <Table dataSource={dataSource} columns={columns} />;
        </div>
      </div>
    </div>
  )
}