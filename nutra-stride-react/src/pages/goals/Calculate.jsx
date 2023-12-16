export default function Calculate() {
  return (
    <div className="calculate">
      <h3>Calculate your TDEE</h3>
      <form>
        <label htmlFor="weight">
          <span>Weight:</span>
          <input type="text" name="weight" id="weight" required />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
