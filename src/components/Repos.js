import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} =React.useContext(GithubContext)

let languages=repos.reduce((total,item)=>{
  const {language}=item
  if(!language){
    return total
  }
  if(!total[language]){
    total[language]={label:language,value:1}
  }
  total[language]={...total[language],value:total[language].value+1}
  return total
},{})
languages=Object.values(languages)
languages=languages.sort((a,b)=>a.value-b.value)
languages=languages.length>5?languages.slice(0,5):languages
console.log(languages)


  return <section className="section">
      <Wrapper className='section-center'>
        <Pie3D data={languages} />
      </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
