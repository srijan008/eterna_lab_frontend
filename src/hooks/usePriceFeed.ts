import { useEffect } from "react";
import { globalPriceFeed } from "@/lib/websocketMock";
import { useQueryClient } from "@tanstack/react-query";
import { Token, TokenCategory } from "@/lib/types";

export const usePriceFeed = (category: TokenCategory, tokens?: Token[]) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!tokens || tokens.length === 0) return;

    globalPriceFeed.start(tokens);

    const unsubscribe = globalPriceFeed.subscribe(({ id, price }) => {
      queryClient.setQueryData<Token[]>(
        ["tokens", category],
        (old) =>
          old?.map((t) =>
            t.id === id
              ? {
                  ...t,
                  price,
                }
              : t
          ) ?? []
      );
    });

    return () => {
      unsubscribe();
    };
  }, [category, tokens, queryClient]);
};
