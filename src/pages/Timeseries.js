import React from "react";
import format from "date-fns/format";
import addHours from "date-fns/add_hours";
import startOfHour from "date-fns/start_of_hour";
import styled from "styled-components";
import Layout from "../containers/Layout";
import Chart from "../components/Chart";
import DateTimePicker from "../components/DateTimePicker";
import Timeseries from "../apis/api";

const api = new Timeseries();

const Column = styled.div`
  height: 100vh;
`;

function mapValue(id, datum) {
  let mappedValue;
  switch (id) {
    case "Tag2":
      mappedValue = +datum;
      break;
    case "Tag3":
      mappedValue = datum.toLowerCase() === "on" ? 1 : 0;
      break;
    default:
      mappedValue = datum;
      break;
  }
  return mappedValue;
}

export default function TimeseriesPage(props) {
  const [tag, setTag] = React.useState(null);
  const [isTagLoading, setIsTagLoading] = React.useState(true);
  const [isTagError, setIsTagError] = React.useState(false);

  const [startDate, setStartDate] = React.useState(
    format(addHours(startOfHour(new Date()), -48), "YYYY-MM-DDTHH:mm")
  );
  const [endDate, setEndDate] = React.useState(
    format(startOfHour(new Date()), "YYYY-MM-DDTHH:mm")
  );
  const [timeseriesData, setTimeseriesData] = React.useState(null);
  const [
    isTimeseriesDataLoading,
    setIsTimeseriesLoadingLoading
  ] = React.useState(true);
  const [isTimeseriesDataError, setIsTimeseriesDataError] = React.useState(
    false
  );

  const { id } = props.match.params;

  React.useEffect(() => {
    async function getTagById() {
      setIsTagLoading(true);
      try {
        const response = await api.getTagById(id);
        setTag(response[0]);
      } catch (e) {
        setIsTagError(true);
      }
      setIsTagLoading(false);
    }
    getTagById();
  }, [id]);

  React.useEffect(() => {
    async function getData() {
      setIsTimeseriesLoadingLoading(true);
      try {
        const response = await api.getDatapoints({
          tagId: id,
          startTS: startDate,
          endTS: endDate
        });
        const data = await response.json();
        const mappedData = data.map(datum => {
          return {
            x: format(new Date(datum.observationTS), "YYYY-MM-DD HH:mm"),
            y: mapValue(id, datum.value)
          };
        });
        setTimeseriesData([
          {
            id: "asdf",
            color: "#00d1b2",
            data: mappedData
          }
        ]);
      } catch (e) {
        setIsTimeseriesDataError(true);
      }
      setIsTimeseriesLoadingLoading(false);
    }
    getData();
  }, [id, startDate, endDate]);

  return (
    <Layout>
      <section className="section">
        <div className="container">
          {tag && <h1 className="title">{tag.label}</h1>}
          <div className="columns">
            <div className="column is-narrow">
              <DateTimePicker
                label="Start Date"
                value={startDate}
                min="2019-08-15"
                max="2019-09-30"
                onChange={setStartDate}
              />
            </div>
            <div className="column is-narrow">
              <DateTimePicker
                label="End Date"
                value={endDate}
                min="2019-08-15"
                max="2019-09-30"
                onChange={setEndDate}
              />
            </div>
          </div>
          <div className="columns">
            <Column className="column">
              {!isTagLoading &&
                !isTimeseriesDataLoading &&
                isTagError &&
                isTimeseriesDataError && <p className="heading">Error</p>}
              {(isTagLoading || isTimeseriesDataLoading) && (
                <p className="heading">Loading...</p>
              )}
              {!isTagLoading &&
                !isTimeseriesDataLoading &&
                timeseriesData &&
                tag && (
                  <Chart
                    yAxis={tag.unit}
                    xAxis={`${format(
                      new Date(startDate),
                      "ddd, MMM Do HH:mm"
                    )} - ${format(new Date(endDate), "ddd, MMM Do HH:mm")}`}
                    data={timeseriesData}
                  />
                )}
            </Column>
          </div>
        </div>
      </section>
    </Layout>
  );
}
