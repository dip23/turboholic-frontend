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

export default function Chart({ dataChart, engineId, vehicleId, fuelId, handleChangeFuel }) {
  const { user } = useContext(UserContext);
  const [fuelType, setFuelType] = useState([]);
  const [date, setDate] = useState([]);
  const [valueConsumption, setValueConsumption] = useState([]);
  const [value, setValue] = useState({
    fuelId: '',
    startDate: '',
    endDate: ''
  });

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
    if(engineId){
      fuelData(engineId)
    }
  }, [engineId]);

  useEffect(() => {
    let dateData = [];
    let valueConsumptionDate = [];
    
    dataChart && dataChart.forEach(item => {
      dateData.push(item.date);
      valueConsumptionDate.push(item.total);
    })
    
    setDate(dateData);
    setValueConsumption(valueConsumptionDate);
  }, [dataChart])

  useEffect(() => {
    setValue({
      ...value,
      fuelId: fuelId
    })
  }, [vehicleId])
  

  const labels = date;

  const data = {
    labels,
    datasets: [
      {
        label: 'Km/L',
        data: valueConsumption,
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

  const changeDate = (e) => {
    setValue({
      ...value,
      fuelId: e.target.value
    })
    handleChangeFuel(e.target.value)
  };

  return (
    <div className={style.root}>
      <div>
        <Select
          name="fuelType"
          options={fuelType}
          displayValue={"name"}
          selected={value.fuelId || fuelId}
          onChange={changeDate}
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
