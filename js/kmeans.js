class KMeans {
  constructor(data, k) {
    this.data = data;  // Data points to cluster
    this.k = k;  // Number of clusters
    this.centroids = this.initCentroids();  // Initial centroids
  }

  initCentroids() {
    const centroids = [];
    const shuffledData = this.data.slice().sort(() => Math.random() - 0.5);
    for (let i = 0; i < this.k; i++) {
      centroids.push(shuffledData[i]);
    }
    return centroids;
  }

  assignToClusters() {
    const clusters = Array.from({ length: this.k }, () => []);
    for (const point of this.data) {
      let minDistance = Infinity;
      let closestCentroid = null;
      for (let i = 0; i < this.k; i++) {
        const distance = this.calculateDistance(point, this.centroids[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroid = i;
        }
      }
      clusters[closestCentroid].push(point);
    }
    return clusters;
  }

  updateCentroids(clusters) {
    const newCentroids = [];
    for (const cluster of clusters) {
      const clusterMean = cluster.length > 0 ? this.calculateMean(cluster) : null;
      if (clusterMean) {
        newCentroids.push(clusterMean);
      }
    }
    return newCentroids;
  }

  run(maxIterations = 100) {
    let iter = 0;
    while (iter < maxIterations) {
      const clusters = this.assignToClusters();
      const newCentroids = this.updateCentroids(clusters);

      // Check for convergence
      if (JSON.stringify(newCentroids) === JSON.stringify(this.centroids)) {
        return { centroids: this.centroids, clusters };
      }

      this.centroids = newCentroids;
      iter++;
    }
    return { centroids: this.centroids, clusters: this.assignToClusters() };
  }

  calculateDistance(point1, point2) {
    // Euclidean distance
    return Math.sqrt(
      point1.reduce((sum, val, i) => sum + (val - point2[i]) ** 2, 0)
    );
  }

  calculateMean(points) {
    const numDimensions = points[0].length;
    const mean = Array(numDimensions).fill(0);
    for (const point of points) {
      for (let i = 0; i < numDimensions; i++) {
        mean[i] += point[i];
      }
    }
    return mean.map(val => val / points.length);
  }
}

//// Example usage
//const data = [
//  [1, 2],
//  [1.5, 1.8],
//  [5, 8],
//  [8, 8],
//  [1, 0.6],
//  [9, 11]
//];
//const k = 2; // Number of clusters
//const kmeans = new KMeans(data, k);
//const { centroids, clusters } = kmeans.run();
//console.log("Centroids:", centroids);
//console.log("Clusters:", clusters);
