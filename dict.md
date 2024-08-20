<script>
  function pronounce(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
</script>

[pronounce](http://pronounce('hello'))