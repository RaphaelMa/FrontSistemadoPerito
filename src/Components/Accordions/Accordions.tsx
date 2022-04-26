
import { Input } from 'antd';
import React from 'react';
import './AccordionStyled.css';

const Accordions: React.FC = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <h2>Open <b>multiple</b></h2>
          <div className="tabs">
            <div className="tab">
              <Input type="checkbox" id="chck1" />
              <label className="tab-label" htmlFor="chck1">Empresa</label>
              <div className="tab-content">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


    // <RowContainer>
    //   <ColContent>
    //     <Text>
    //       Empresa
    //     </Text>
    //     <TabsAccordion>
    //       <TabAccordion>
    //         <Input type="checkbox" id="chck1" />
    //         <label className="tab-label" htmlFor="chck1">Item 1</label>
    //         <TabContent>
    //           Lorem ipsum dolor sit amet consectetur,
    //           adipisicing elit. Ipsum, reiciendis!
    //         </TabContent>
    //       </TabAccordion>
    //     </TabsAccordion>
    //   </ColContent>
    // </RowContainer>
  );
}

export default Accordions

// const RowContainer = styled.div`
//   display: flex;
// `;

// const ColContent = styled.div`
//   flex: 1;
//   &:last-child {
//     margin-left: 1em;
//   }
// `;

// const Text = styled.h2`
//   margin: 0 0 .5em;
//   font-weight: normal;
// `;

// const TabsAccordion = styled.div`
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
// `;

// const TabAccordion = styled.div`
//   width: 100%;
//   color: white;
//   overflow: hidden;
//   &-label {
//     display: flex;
//     justify-content: space-between;
//     padding: 1em;
//     background: #f1f1f1;
//     font-weight: bold;
//     cursor: pointer;
//     /* Icon */
//     &:hover {
//       background: darken(#2c3e50, 10%);
//     }
//     &::after {
//       content: "\276F";
//       width: 1em;
//       height: 1em;
//       text-align: center;
//       transition: all .35s;
//     }
//   }
//   &-content {
//     max-height: 0;
//     padding: 0 1em;
//     color: #2c3e50;
//     background: white;
//     transition: all .35s;
//   }
//   &-close {
//     display: flex;
//     justify-content: flex-end;
//     padding: 1em;
//     font-size: 0.75em;
//     background: red;
//     cursor: pointer;
//     &:hover {
//       background: darken(#2c3e50, 10%);
//     }
//   }
// `;

// const TabContent = styled.div`
//   max-height: 100vh;
//   padding: 1em;
// `;

// const Input = styled.input`
//   &:checked {
//   + .tab-label {
//     background: darken($midnight, 10%);
//     &::after {
//       transform: rotate(90deg);
//     }
//   }
//   ~ .tab-content {
//     max-height: 100vh;
//     padding: 1em;
//   }
// }
// `;

