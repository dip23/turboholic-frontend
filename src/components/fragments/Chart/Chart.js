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
import Modal from '../../elements/Modal';
import Button from '../../elements/Button';

export default function Chart(props) {
  const {
    dataChart,
    engineId,
    vehicleId,
    fuelId,
    handleChangeFuel,
    handleChangeDate
  } = props;

  const { user } = useContext(UserContext);
  const [fuelType, setFuelType] = useState([]);
  const [date, setDate] = useState([]);
  const [valueConsumption, setValueConsumption] = useState([]);
  const [value, setValue] = useState({
    fuelId: '',
    startDate: '',
    endDate: ''
  });
  const [modalDate, setModalDate] = useState(false);

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

  // useEffect(() => {
  //   let allData = {name: 'Semua Tipe', id: ''};
  //   fuelType.push(allData);
  // }, [fuelType])

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

  const changeFuel = (e) => {
    setValue({
      ...value,
      fuelId: e.target.value
    })
    handleChangeFuel(e.target.value)
  };

  const now = new Date();

  const optionFirst = { day: 'numeric', month: 'short' };
  const optionSecond = { day: 'numeric', month: 'short', year: 'numeric' };

  const firsDate = new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString("id-ID", optionFirst);
  
  const today = new Date().toLocaleDateString("id-ID", optionSecond);
  const defaultDate = new Date().toISOString().split('T')[0]

  const changeDate = (e) => {
    e.preventDefault();
    handleChangeDate(e.target[0].value, e.target[1].value);
    setValue({
      ...value,
      startDate: new Date(e.target[0].value).toLocaleDateString("id-ID", optionFirst),
      endDate: new Date(e.target[1].value).toLocaleDateString("id-ID", optionSecond),
    });
    setModalDate(false);
  };

  return (
    <div className={style.root}>
      <div>
        <Select
          name="fuelType"
          options={fuelType}
          displayValue={"name"}
          selected={value.fuelId || fuelId}
          onChange={changeFuel}
        />
        <Button onClick={() => setModalDate(true)}>
          {value?.startDate || firsDate} - {value?.endDate || today}
        </Button>
      </div>
      <Line options={options} data={data} />
      <Modal
        show={modalDate}
        title={"Pilih Tanggal"}
        onClose={()=>setModalDate(false)}
        className={style.modalDate}
      >
        <form className={style.dateForm} onSubmit={changeDate}>
          <div>
            <Text
              label="Dari"
              name="startDate"
              inputProps={{type: "date", placeholder: "DD/MM/YYYY", defaultValue: defaultDate}}
            />
            <Text
              label="Sampai"
              name="endDate"
              inputProps={{type: "date", placeholder: "DD/MM/YYYY", defaultValue: defaultDate}}
            />
          </div>
          <Button
            buttonProps={{type: "submit"}}
          >Atur Tanggal</Button>
        </form>
      </Modal>
    </div>
  )
}

Chart.defaultProps = {
  handleChangeFuel: ()=>{},
  handleChangeDate: ()=>{}
}
