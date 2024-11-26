import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PersonInfo {
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  height: string;
  weight: string;
  index: number;
  position: string;
  candidate: string;
  imageUrl: string;
}

interface ChartItem {
  label: string;
  value: number;
  color: string; 
}

const App = () => {
  const [personInfo, setPersonInfo] = useState<PersonInfo | null>(null);
  const [charts, setCharts] = useState<ChartItem[]>([]);

  useEffect(() => {
    fetch("https://trello.vimlc.uz/get-personal-info")
      .then((response) => response.json())
      .then((data: PersonInfo) => setPersonInfo(data))
      .catch((error) => console.error("Error fetching personal info:", error));
  }, []);

  useEffect(() => {
    fetch("https://trello.vimlc.uz/knowlodge")
      .then((response) => response.json())
      .then((data: ChartItem[]) => {
        if (Array.isArray(data)) {
          setCharts(data);
        }
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  }, []);

  const chartData = {
    labels: charts.map((item) => item.label),
    datasets: [
      {
        label: "Тест натижалари (%)",
        data: charts.map((item) => item.value),
        backgroundColor: charts.map((item) => item.color), 
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-around items-start mt-20">
        <div className="flex gap-8">
          <div>
            <img
              className="w-[216px] h-[288px]"
              src={personInfo?.imageUrl || "http://trello.vimlc.uz/images/user.png"}
              alt="User"
            />
          </div>
          <div>
            <h3 className="font-semibold text-5xl">{personInfo?.firstName || "No name"}</h3>
            <h3 className="font-normal text-5xl mb-8">{personInfo?.lastName || "No last name"}</h3>
            <p className="text-lg mb-1">Тугилган сана: {personInfo?.birthday || "Not available"}</p>
            <p className="text-lg mb-6">Тугилган жой: {personInfo?.address || "Not available"}</p>
            <div className="flex items-center">
              <div className="mb-4">
                <div className="flex gap-3 mb-1">
                  <p className="text-base">Буйи:</p>
                  <p className="text-base">Вазни:</p>
                  <p className="text-base">Индекс:</p>
                </div>
                <div className="flex gap-3">
                  <p className="font-bold text-lg">{personInfo?.height || "Not available"}</p>
                  <p className="font-bold text-lg">{personInfo?.weight || "Not available"}</p>
                  <p className="font-bold text-lg">{personInfo?.index || "Not available"}</p>
                </div>
              </div>
              <div className="w-[200px]">
                <ReactSpeedometer
                  width={150}
                  height={80}
                  needleHeightRatio={0.7}
                  minValue={0}
                  maxValue={70}
                  value={personInfo?.index || 0}
                  customSegmentStops={[0, 10, 20, 30, 40, 50, 60, 70]}
                  segmentColors={[
                    "#3399CC",
                    "#99CC33",
                    "#669900",
                    "#FFCC00",
                    "#FF9900",
                    "#FF6600",
                    "#B01616",
                  ]}
                  ringWidth={30}
                  needleColor="#000000"
                  textColor="transparent"
                />
                <h3 className="text-center text-xl font-normal text-[#0956AF] mr-7">НОРМА</h3>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-gray-500 mb-2 text-base">Лавозими:</h4>
          <p className="w-96 font-normal mb-20 text-xl text-gray-800">{personInfo?.position || "No position"}</p>
          <h4 className="text-gray-500 mb-2 text-base">Номзод:</h4>
          <p className="w-96 font-normal text-xl text-gray-800">{personInfo?.candidate || "No candidate info"}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
