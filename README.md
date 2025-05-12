
# Daily Atlas 🌎

A interactive 3D globe visualization application that allows users to explore countries, cities, and local points of interest from around the world.

## Features

- **Interactive 3D Globe**: Navigate a beautiful 3D globe with country and city information
- **Location Exploration**: Click on countries or cities to view detailed information
- **Points of Interest**: Explore tourist attractions, restaurants, and landmarks in major cities
- **User Accounts**: Save your favorite locations and customize your experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- React with TypeScript
- Three.js for 3D visualization
- React Three Fiber & Drei for Three.js integration with React
- Tailwind CSS for styling
- Lucide React for icons
- React Router for navigation
- React Query for data management

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/daily-atlas.git
   cd daily-atlas
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

- **Rotate Globe**: Click and drag the globe to rotate it
- **Zoom**: Use the scroll wheel to zoom in and out
- **Select Location**: Click on a country or city to view information
- **Explore Places**: When a city is selected, view places of interest
- **User Menu**: Access user settings and location filters from the menu in the top left
- **Login/Register**: Create an account to save your preferences

## Project Structure

- `src/components`: React components
- `src/components/globe`: 3D globe components
- `src/pages`: Application pages
- `src/data`: Data files for countries and places
- `src/hooks`: Custom React hooks

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Three.js community for the 3D rendering tools
- Tailwind CSS team for the styling framework
- Shadcn UI for component library
