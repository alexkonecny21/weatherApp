import { DiamondExclamation } from '@gravity-ui/icons';
import { toast } from "@heroui/react";

export default function MessageToast( messageHeader, description ) {
  setTimeout(() => {
        toast.danger(messageHeader, {
        actionProps: {
        children: "Dismiss",
        onPress: () => toast.clear(),
        variant: "danger-soft",
        },
        description,
        indicator: <DiamondExclamation />,
        variant: "default",
    });
  }, 400)
}