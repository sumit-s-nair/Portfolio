export type SpacingToken = StaticSpacingToken | ResponsiveSpacingToken;

export type StaticSpacingToken = 
| '0'
| '1'
| '2'
| '4'
| '8'
| '12'
| '16'
| '20'
| '24'
| '32'
| '40'
| '48'
| '56'
| '64'
| '80'
| '104'
| '128'
| '160';

export type TShirtSizes = 
| 'xs'
| 's'
| 'm'
| 'l'
| 'xl';

export type ResponsiveSpacingToken = TShirtSizes;