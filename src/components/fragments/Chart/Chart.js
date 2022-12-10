import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import style from './styles.module.css';
import vehicle from '../../../api/Vehicle';
import { UserContext } from '../../../context/UserContext';
import Select from '../../fields/Select';
import Text from '../../fields/Text';

export default function Chart({ engineId }) {
  const { user } = useContext(UserContext);
  const [fuelType, setFuelType] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const fuelData = async (id) => {
    const res = await vehicle.getFuelById(id, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    setFuelType(res.data.content.fuelType);
  }

  useEffect(() => {
    fuelData(engineId || 1)
  }, [engineId])

  const labels = ['1 Nov', '10 Nov', '20 Nov', '31 Nov'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Km/L',
        data: [25, 30, 34, 50],
        borderColor: '#A41623',
        backgroundColor: '#A41623',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
          labels: {
              font: {
                  family: "'Poppins', sans-serif"
              }
          }
      }
    },
  };

  const defaultDate = new Date().toISOString().substring(0,10);

  return (
    <div className={style.root}>
      <div>
        <Select
          name="fuelType"
          options={fuelType}
          displayValue={"name"}
        />
        <Text
          name="date"
          inputProps={{type: "date", defaultValue: defaultDate}}
        />
      </div>
      <Line options={options} data={data} />
    </div>
  )
}
