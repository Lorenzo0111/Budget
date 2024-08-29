import { cssInterop } from "nativewind";
import {
  Button as RNButton,
  Text as RNText,
  TextInput as RNTextInput,
} from "react-native-paper";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "./Theme";

const RemappedSafeAreaView = cssInterop(RNSafeAreaView, {
  className: { target: "style" },
});

export function SafeAreaView({
  className,
  ...props
}: React.ComponentProps<typeof RNSafeAreaView>) {
  return (
    <RemappedSafeAreaView
      className={`flex-1 bg-background ${className || ""}`}
      {...props}
    />
  );
}

export const Button = cssInterop(RNButton, {
  className: { target: "style" },
  labelClassName: { target: "labelStyle" },
});

const RemappedTextInput = cssInterop(RNTextInput, {
  className: { target: "style" },
});

const RemappedText = cssInterop(RNText, {
  className: { target: "style" },
});

export function TextInput({
  className,
  style,
  outlineStyle,
  contentStyle,
  ...props
}: React.ComponentProps<typeof RemappedTextInput>) {
  const theme = useTheme();

  return (
    <RemappedTextInput
      outlineStyle={[
        {
          borderRadius: 15,
          borderColor: "transparent",
        },
        outlineStyle,
      ]}
      contentStyle={[
        {
          paddingLeft: 10,
        },
        contentStyle,
      ]}
      style={[
        {
          backgroundColor: theme.card,
        },
        style,
      ]}
      className={className}
      mode="outlined"
      {...props}
    />
  );
}

export function Text({
  className,
  ...props
}: React.ComponentProps<typeof RemappedText>) {
  return <RemappedText className={`text-text ${className || ""}`} {...props} />;
}
