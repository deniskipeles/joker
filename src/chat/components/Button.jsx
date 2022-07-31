import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

// core components

import buttonStyle from "../assets/jss/buttonStyle.js";

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle
}));

const RegularButton = React.forwardRef((props, ref) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;

  const classes = makeComponentStyles();
