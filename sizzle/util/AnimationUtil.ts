type EasingFunction = (t: number) => number;

interface AnimationOptions {
  duration: number;
  easing: EasingFunction;
  onUpdate: (value: number) => void;
  onComplete?: () => void;
}

// export function animate(options: AnimationOptions): void {
//   const start = performance.now();
//   const { duration, easing, onUpdate, onComplete } = options;

//   function tick() {
//     const elapsed = performance.now() - start;
//     const progress = Math.min(elapsed / duration, 1);
//     const easedProgress = easing(progress);
//     const value = easedProgress;
//     onUpdate(value);

//     if (progress < 1) {
//       requestAnimationFrame(tick);
//     } else if (onComplete) {
//       onComplete();
//     }
//   }

//   requestAnimationFrame(tick);
// }

export function animate(options: AnimationOptions) {
  const startTime = performance.now();

  function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / options.duration, 1);
      const value = options.easing(t);

      options.onUpdate(value);

      if (elapsed <  options.duration) {
          requestAnimationFrame(step);
      } else {
        options.onUpdate(1);
      }
  }

requestAnimationFrame(step);
}


  // 自定义缓动函数，使用贝塞尔曲线
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
    return function (t: number): number {
      const cx = 3 * x1;
      const bx = 3 * (x2 - x1) - cx;
      const ax = 1 - cx - bx;
  
      const cy = 3 * y1;
      const by = 3 * (y2 - y1) - cy;
      const ay = 1 - cy - by;
  
      function sampleCurveX(t: number): number {
        return ((ax * t + bx) * t + cx) * t;
      }
  
      function solveCurveX(x: number, epsilon = 1e-6): number {
        let t0 = 0;
        let t1 = 1;
        let t2 = x;
  
        while (Math.abs(t2 - x) > epsilon) {
          t2 = (t0 + t1) / 2;
          const x2 = sampleCurveX(t2);
          if (x2 < x) {
            t0 = t2;
          } else {
            t1 = t2;
          }
        }
  
        return t2;
      }
  
      function solve(x: number, epsilon = 1e-6): number {
        return ((ay * solveCurveX(x, epsilon) + by) * solveCurveX(x, epsilon) + cy) * solveCurveX(x, epsilon);
      }
  
      return solve(t);
    };
  }

   // 计算 spring 动画的缓动函数
   export function springEasing(stiffness: number, damping: number,mass : number, duration: number): EasingFunction {
    const initialPosition = 0;
    const target = 1;

    let position = initialPosition;
    let velocity = 0;

    function simulate(t: number): number {
        const dt = t * duration / 60;
        const F_spring = -stiffness * (position - target);
        const F_damping = -damping * velocity;
        const F_net = F_spring + F_damping;
        const a = F_net / mass;

        velocity += a * dt;
        position += velocity * dt;

        return position;
    }

    return simulate;
}