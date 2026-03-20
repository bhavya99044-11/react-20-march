import React from 'react'
import icons from '../../assets/svg'
import classNames from 'classnames';

const IconComponent = ({icon,className}) => {

    const Icon = icons[icon];

      if (!Icon) return null;

  return <img src={Icon} className={classNames('',className)} alt={icon} />
}

export default IconComponent
