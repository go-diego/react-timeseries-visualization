import React from "react";
import styled from "styled-components";
import Layout from "../containers/Layout";
import TagCard from "../components/TagCard";
import TagFilters from "../components/TagFilters";
import Timeseries from "../apis/api";

const api = new Timeseries();

const Column = styled.div`
  display: flex;
`;

export default function Home() {
  const [originalTags, setOriginalTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [features, setFeatures] = React.useState([]);
  const [activeFilters, setActiveFilters] = React.useState([]);

  React.useEffect(() => {
    async function getTags() {
      try {
        const response = await api.getTags();
        const data = await response.json();
        const uniqueFeatures = data.reduce((acc, datum) => {
          acc = [...new Set([...acc, ...datum.features])];
          return acc;
        }, []);
        setFeatures(uniqueFeatures);
        setOriginalTags(data);
        setTags(data);
      } catch (e) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    getTags();
  }, []);

  React.useEffect(() => {
    setTags(originalTags);
    if (activeFilters && activeFilters.length > 0) {
      const filteredTags = originalTags.filter(tag =>
        activeFilters.every(f => tag.features.includes(f))
      );
      setTags(filteredTags);
    }
  }, [activeFilters]);

  function onFilterSelect(filter) {
    const filters = [...activeFilters];
    filters.push(filter);
    setActiveFilters(filters);
  }

  function onFilterDeselect(filter) {
    const filters = [...activeFilters];
    setActiveFilters(filters.filter(f => f !== filter));
  }

  return (
    <Layout>
      <section className="section">
        <div className="container">
          {isError && <p className="heading">Error</p>}
          {isLoading && <p className="heading">Loading...</p>}
          {!isLoading && (
            <React.Fragment>
              <div className="field is-grouped is-grouped-multiline">
                {features.map((feature, i) => {
                  return (
                    <TagFilters
                      key={i}
                      onFilterDeselect={onFilterDeselect}
                      onFilterSelect={onFilterSelect}
                      label={feature}
                    />
                  );
                })}
              </div>
              <div className="columns is-multiline">
                {tags.map((tag, i) => {
                  return (
                    <Column key={i} className="column is-one-third">
                      <TagCard id={tag.tagId}>
                        <h1 className="title is-5">{tag.label}</h1>
                        <div className="tags">
                          {tag.features.map((feature, j) => (
                            <span key={j} className="tag is-dark">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </TagCard>
                    </Column>
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </div>
      </section>
    </Layout>
  );
}
