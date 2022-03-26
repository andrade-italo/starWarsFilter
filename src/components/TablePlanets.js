import React, { useEffect, useState } from 'react';
import './tablePlanets.css'

function TablePlanets() {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState('');
  const [columnfilter, setColumnFilter] = useState('population');
  const [comparisonfilter, setComparisonFilter] = useState('maior que');
  const [valuefilter, setValueFilter] = useState(0);
  const [appendFilter, setAppendFilter] = useState([]);
  const [numericFilter, setNumericFilter] = useState({
    population: [],
    orbital_period: [],
    diameter: [],
    rotation_period: [],
    surface_water: [],
  });

  const arrayNumericFilter = Object.keys(numericFilter);

  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const getPlanet = async () => {
      const { results } = await fetch(endPoint).then((response) => response.json());
      results.forEach((e) => delete e.residents);
      setPlanets(results);
      arrayNumericFilter.forEach((e) => setNumericFilter(
        (prev) => ({ ...prev, [e]: results }),
      ));
    };
    getPlanet();
  }, []);

  const regex = new RegExp(`${filter}`, 'i');

  const keysTh = planets.reduce((acc, e, i) => (i === 0 ? Object.keys(e) : acc), []);

  const removeFilters = () => {
    arrayNumericFilter.forEach((e) => setNumericFilter((prev) => (
      { ...prev, [e]: planets })));
    setAppendFilter([]);
    setColumnFilter(arrayNumericFilter[0])
  };

  const comparison = (planet) => {
    switch (comparisonfilter) {
    case 'menor que':
      return Number(planet) < Number(valuefilter);
    case 'igual a':
      return Number(planet) === Number(valuefilter);
    default:
      return Number(planet) > Number(valuefilter);
    }
  };

  const planetsFilter = planets.filter(
    (planet) => comparison(planet[columnfilter]),
  );

  const newPlanetsFiltered = numericFilter.orbital_period
    .filter((e) => numericFilter.population.includes(e))
    .filter((e2) => numericFilter.rotation_period.includes(e2))
    .filter((e3) => numericFilter.surface_water.includes(e3))
    .filter((e4) => numericFilter.diameter.includes(e4));

  const handleClick = () => {
    arrayNumericFilter.map((e, i) => {
      switch (columnfilter) {
      case e:
        return (
          setNumericFilter((prev) => (
            { ...prev, [e]: planetsFilter }
          ),
          setAppendFilter((prev) => [...prev, [columnfilter, comparisonfilter, valuefilter]])),
          setValueFilter(0),
          setColumnFilter(arrayNumericFilter.find((element) => (!appendFilter.some((foreat) => foreat.includes(element))) && element !== e))
          );
      default:
        return setNumericFilter((prev) => ({ ...prev }));
      }
    });
  };

  const handleRemove = (target) => {
    arrayNumericFilter.map((e) => {
      switch (target.value) {
      case 'all':
        return removeFilters();
      case e:
        return (
          setNumericFilter((prev) => ({ ...prev, [e]: planets })),
          setAppendFilter((prev) => prev.filter((column) => column[0] !== e))
        );
      default:
        return setNumericFilter((prev) => ({ ...prev }));
      }
    });
  };

  return (
    <div>
      <header>
        <div className='container'>
        <div className='filterText'>
          <input
            type="text"
            data-testid="name-filter"
            placeholder='Digite o nome do planeta'
            onChange={ ({ target }) => setFilter(target.value) }
          />
          </div>
          <div className='numericFilter'>
          <select
            data-testid="column-filter"
            onChange={ ({ target }) => setColumnFilter(target.value) }
          >
            {arrayNumericFilter.map((e) => (appendFilter.every((element) => element[0] !== e)
              && <option key={ e } value={ e }>{e}</option>
            ))}

          </select>
          <select
            data-testid="comparison-filter"
            onChange={ ({ target }) => setComparisonFilter(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="number"
            data-testid="value-filter"
            value={ valuefilter }
            onChange={ ({ target }) => setValueFilter(target.value) }
          />
          <button type="button" data-testid="button-filter" onClick={ handleClick }>
            Filtrar
          </button>
          </div>
          <div className={!!appendFilter.length && 'filtered'}>
          {appendFilter.map(([ columnfilter, comparisonfilter, valuefilter ]) => (
            <p key={ columnfilter } data-testid="filter">
              {`${columnfilter} ${comparisonfilter} ${valuefilter}`}
              <button
                type="button"
                value={ columnfilter }
                onClick={ ({ target }) => handleRemove(target) }
              >
                X
              </button>
            </p>
          ))}
          </div>

          {
            !!appendFilter.length && <button
              data-testid="button-remove-filters"
              type="button"
              value="all"
              onClick={ ({ target }) => handleRemove(target) }
            >
              Remove all filters
            </button>
          }
            </div>
          </header>

      <table>
        <thead>
          <tr>
            {keysTh.map((key) => (
              <th key={ key }>{ key }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {newPlanetsFiltered.map(
            (planet) => planet.name.match(regex) && (
              <tr key={ planet.name }>
                {Object.values(planet).map((value) => (
                  <td key={ value }>{ value }</td>
                ))}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablePlanets;
