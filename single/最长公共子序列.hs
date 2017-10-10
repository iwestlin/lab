import Data.Function.Memoize

partMax :: (Int,String) -> (Int,String) -> (Int,String)
partMax (a,xs) (b,ys) = if a >= b then (a,xs) else (b,ys) 

lcs a b = f (length a - 1) (length b - 1)
    where
        f 0 0 = (0,[])
        f 0 _ = (0,[])
        f _ 0 = (0,[])
        f n m = if a !! n == b !! m
            then let (len,xs) = f' (n-1) (m-1) in (1+len,((a!!n):xs))
            else partMax (f' (n-1) m) (f' n (m-1))
        f' = memoize2 $ f


main = do
    -- print $ length a
    -- print $ length b
    let (z,s) = lcs a b
    -- print z
    print $ reverse s
    where
        a = "1234helloworld2j3293gdgdg6464642093jdklwjflwewt423412897491274uhrf12rfr12"
        b = "03424helloworldfdfcp043p92jflkf79hhedhey464w6hsry4648721fjbmcvszfq39wnf39804"

-- 24helloworld2j9d64646429wf384