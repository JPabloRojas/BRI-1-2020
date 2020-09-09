import React from 'react';
import parts from './parts';

const Male = props => {
  const { onClickPart } = props;

  return (
    <svg
      className='model-male-front'
      viewBox='0 0 168 320'
      xmlns='http://www.w3.org/2000/svg'
      fill-rule='evenodd'
      stroke-linejoin='round'
      stroke-miterlimit='1.414'
      style={{ maxHeight: '60vh', display: 'flex', justifyContent: 'center' }}
    >
      <g>
        <path d={parts.maleFront}></path>
      </g>
      <g className='body-parts'>
        {/* cabeza */}
        {/* <g>
          <path className='body-head' d={parts.wholeHead}></path>
        </g> */}

        {/* partes cabeza */}
        <path id='head' name='Cabeza' className='body-area' d={parts.head} onClick={onClickPart}></path>
        <path id='eyes' name='Ojos' className='body-area' d={parts.eyes} onClick={onClickPart}></path>
        <path id='ears' name='Orejas' className='body-area' d={parts.ears} onClick={onClickPart}></path>
        <path id='nose' name='Nariz' className='body-area' d={parts.nose} onClick={onClickPart}></path>
        <path
          id='oralCavity'
          name='Cavidad bucal'
          className='body-area'
          d={parts.oralCavity}
          onClick={onClickPart}
        ></path>
        <path id='neck' name='Cuello' className='body-area' d={parts.neck} onClick={onClickPart}></path>

        {/* torso */}
        <path id='chest' name='Pectorales' className='body-area' d={parts.chest} onClick={onClickPart}></path>
        <path
          id='upperAbdomen'
          name='Abdomen alto'
          className='body-area'
          d={parts.upperAbdomen}
          onClick={onClickPart}
        ></path>
        <path
          id='midAbdomen'
          name='Abdomen medio'
          className='body-area'
          d={parts.midAbdomen}
          onClick={onClickPart}
        ></path>
        <path
          id='lowerAbdomen'
          name='Abdomen bajo'
          className='body-area'
          d={parts.lowerAbdomen}
          onClick={onClickPart}
        ></path>
        {/* brazos */}
        <path id='upperArm' name='Brazos' className='body-area' d={parts.upperArm} onClick={onClickPart}></path>
        <path id='foreArm' name='Antebrazos' className='body-area' d={parts.foreArm} onClick={onClickPart}></path>
        <path id='hands' name='Manos' className='body-area' d={parts.hands} onClick={onClickPart}></path>
        {/* parte baja */}
        <path
          id='sexualOrgans'
          name='Órganos sexuales'
          className='body-area'
          d={parts.sexualOrgans}
          onClick={onClickPart}
        ></path>
        <path id='thighs' name='Muslos' className='body-area' d={parts.thighs} onClick={onClickPart}></path>
        <path id='knees' name='Rodillas' className='body-area' d={parts.knees} onClick={onClickPart}></path>
        <path id='lowerLeg' name='Piernas bajas' className='body-area' d={parts.lowerLeg} onClick={onClickPart}></path>
        <path id='foot' name='Pies' className='body-area' d={parts.foot} onClick={onClickPart}></path>
      </g>
    </svg>
  );
};

export default Male;
